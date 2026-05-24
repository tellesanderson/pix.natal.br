import { credits, textNodes } from './../my-game/game.js';

function cleanText(str) {
  if (!str) return '';
  return str.replace(/\s*\[cite:\s*[^\]]+\]/g, '');
}

function cleanStoryText(text) {
  if (!text) return '';
  let cleaned = text.replace(/\s*\[cite:\s*[^\]]+\]/g, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '');

  const patterns = [
    // Specific page instructions with dynamic numbers (must run before general ones)
    /Se quiser tentar abri-la, vá para \d+\.\s*Se quiser tentar o outro corredor, vá para \d+\.?/gi,
    /Se você deseja convidar Parx para participar do roubo, vá para \d+\.\s*Se não confia no clérigo trapaceiro e prefere agir sozinho, vá para \d+\.?/gi,
    /Se quiser seguir o conselho de Parx, vá para \d+\.\s*Prefere usar sua estratégia costumeira, protegido pela escuridão\? Vá para \d+\.?/gi,
    /Se ainda não investigou o cetro e quer fazê-lo agora, vá para \d+\.\s*Se prefere abandonar a sala, vá para \d+\.?/gi,
    /Se quer procurar armadilhas, vá para \d+\.\s*Se quiser ignorar armadilhas e apenas abrir a porta, \d+\.?/gi,
    /Se quiser dar uma escutadela na porta antes de tentar arrombá-la, leia o \d+\.\s*Se quiser voltar e pegar o caminho da esquerda, vá para \d+\.\s*Se quiser poupar tempo e meter o pé na porta, vá para \d+\.?/gi,
    /Enquanto espera a noite cair, vá para \d+\.?/gi,
    /Se quiser correr o risco e tocar o cajado, vá para \d+\.\s*Se ainda não investigou a estatueta e quer fazê-lo agora, vá para \d+\.\s*Se quer sair da sala sem tocar em mais nada, vá para \d+\.?/gi,
    /Se você aceita o convite de Parx para um assalto, vá para \d+\.\s*Se prefere deixar o homem seguir em paz, vá para \d+\.?/gi,
    /Resmungando, você espera o anoitecer\. Vá para \d+\.?/gi,
    /Uma espada recurvada dos salteadores do deserto\.\s*Se quiser pegá-la, vá para \d+\.\s*Uma lança prateada, com dragões esculpidos no cabo\.\s*Se quiser agarrá-la, vá para \d+\.\s*Um elmo dourado com a forma de uma concha\.\s*Se quiser colocá-lo, vá para \d+\.\s*Um colar de contas vermelhas\.\s*Para pegá-lo, vá para \d+\.?/gi,
    /Se quiser deixar a tarefa para Parx, vá para \d+\.\s*Se quiser usar seu próprio poder, vá para \d+\.?/gi,
    /Se você quiser colar o ouvido à porta e escutar, vá para \d+\.\s*Se acha que pode haver uma armadilha na porta, vá para \d+\.?/gi,
    /Se quiser roubar a adaga, vá para \d+\.\s*Se está satisfeito com a bolsa de moedas, vá para \d+\.?/gi,
    /Se quiser mexer na tocha, vá para \d+\.\s*Se acha melhor procurar armadilhas antes de mexer na tocha, vá para \d+\.?/gi,
    /Se quer forçar a fechadura com suas ferramentas, vá para \d+\.\s*Se quiser voltar e pegar o caminho da esquerda, vá para \d+\.?/gi,
    /Uma estatueta metálica sobre uma mesinha, no canto do quarto\.\s*Se quiser pegá-la, vá para \d+\.\s*Um cetro, suspenso na parede, tendo em sua ponta um cristal transparente\.\s*Se quiser pegá-lo, vá para \d+\.\s*Se prefere deixar tudo onde está, vá para \d+\.?/gi,
    /Se quiser usar suas ferramentas para destrancá-la, vá para \d+\.\s*Se quiser tentar o outro corredor, vá para \d+\.?/gi,
    /Se quiser apresentar-se como negociante de artefatos mágicos, vá para \d+\.\s*Se prefere agir sob o disfarce de emissário da Guilda, vá para \d+\.?/gi,
    /Se quiser procurar armadilhas na porta, vá para \d+\.\s*Se quiser tentar abrir a porta, vá para \d+\.\s*Se quiser tentar o outro corredor, vá para \d+\.?/gi,
    /Se quiser pegar o caminho da direita, vá para \d+\.\s*Se prefere o da esquerda, vá para \d+\.?/gi,
    /Vamos, pois, à procura do bom Mestre Arsenal\. Vá para \d+\.?/gi,
    /Três objetos estão ao seu alcance:/gi,
    
    // General/fallback page instructions (must run last)
    /Comece lendo o trecho \d+\.?/gi,
    /Vá para \d+\.?/gi
  ];

  patterns.forEach(regex => {
    cleaned = cleaned.replace(regex, '');
  });

  return cleaned.trim();
}

function cleanOptionText(text) {
  if (!text) return '';
  const cleaned = text.trim();
  const simpleTransitionRegex = /^(?:vá\s+para|ir\s+para(?:\s+o\s+trecho)?|ir\s+ao\s+trecho)\s+\d+$/i;
  if (simpleTransitionRegex.test(cleaned)) {
    return "Continuar";
  }
  
  return cleaned
    .replace(/\s*\(?vá\s+para\s+\d+\)?/gi, '')
    .replace(/\s*\(?ir\s+para\s+o\s+trecho\s+\d+\)?/gi, '')
    .replace(/\s*\(?trecho\s+\d+\)?/gi, '')
    .trim();
}

const imageElement = document.getElementById('image');
const textElement = document.getElementById('text');
const inventoryElement = document.getElementById('inventory');
const optionButtonsElement = document.getElementById('options');
const glassPanel = document.querySelector('.main-glass-panel');

let state = {};
let isNarrating = false;
let ptVoice = null;

function loadVoices() {
  if (!window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  const ptBRVoices = voices.filter(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'));
  
  if (ptBRVoices.length > 0) {
    ptVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('natural') && v.name.toLowerCase().includes('microsoft'))
              || ptBRVoices.find(v => v.name.toLowerCase().includes('natural'))
              || ptBRVoices.find(v => v.name.toLowerCase().includes('online'))
              || ptBRVoices.find(v => v.name.toLowerCase().includes('google'))
              || ptBRVoices[0];
  }
}

if (window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();
}

function startGame() {
  state = {};
  showTextNode("intro");
}

function getBgForId(id) {
  const forestApproach = ["intro", "01", "02", "10", "24", "37"];
  const corridorsAndTraps = ["05", "06", "09", "14", "16", "20", "23", "25", "28", "29", "30", "34", "36", "38", "39"];
  const collectionRooms = ["03", "07", "08", "12", "26", "35"];
  const combats = ["13", "15", "19", "27", "31", "33"];
  const failures = ["11", "17", "22"];
  const success = ["40"];
  
  if (forestApproach.includes(id)) return 'linear-gradient(to bottom, #11052C, #0F0E17)';
  if (corridorsAndTraps.includes(id)) return 'linear-gradient(to bottom, #001e2b, #0a0a0c)';
  if (collectionRooms.includes(id)) return 'linear-gradient(to bottom, #2c003e, #fe346e, #d4af37)';
  if (combats.includes(id)) return 'linear-gradient(to bottom, #4d0000, #ff3333, #ffcc00)';
  if (failures.includes(id)) return 'linear-gradient(to bottom, #000000, #1c1c1c)';
  if (success.includes(id)) return 'linear-gradient(to bottom, #1a3c40, #406882, #d4af37)';
  
  return 'linear-gradient(to bottom, #1a0826, #0a050f)';
}

function showTextNode(textNodeIndex) {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    isNarrating = false;
    const btn = document.getElementById('btn-narrate');
    if(btn) btn.innerText = "🔊 Ouvir Cena";
  }

  // Visual effects reset
  document.body.classList.remove('whiteout-explosion');
  glassPanel.classList.remove('matrix-bg', 'glitch-effect');

  // Trigger special sound/visual effects on specific narrative nodes
  if (textNodeIndex === "33" || textNodeIndex === "30") {
      document.body.classList.add('whiteout-explosion');
      playEffectSound('explosion');
  } else if (textNodeIndex === "11" || textNodeIndex === "15" || textNodeIndex === "19" || textNodeIndex === "27") {
      glassPanel.classList.add('glitch-effect');
      playEffectSound('death');
  } else if (textNodeIndex === "13") {
      // Climax
      document.body.style.filter = "contrast(1.2) saturate(1.4)";
      playEffectSound('boss');
  } else {
      document.body.style.filter = "none";
  }

  let textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  const bgContainer = document.getElementById('bg-container');
  if(bgContainer) {
    bgContainer.style.background = getBgForId(textNodeIndex);
  }

  imageElement.innerHTML = "";
  if (textNode.img) {
    let img = document.createElement('img');
    img.src = `./my-game/images/scenes/${textNode.img}`;
    imageElement.appendChild(img);
  }

  textElement.innerHTML = "";
  if (textNode.texto) {
    const cleanStory = cleanStoryText(textNode.texto);
    if (cleanStory) {
      const paragraphs = cleanStory.split('\n');
      paragraphs.forEach(paraText => {
        let p = document.createElement('p');
        p.innerText = paraText;
        textElement.appendChild(p);
      });
    }
  }

  optionButtonsElement.innerHTML = "";
  const choices = textNode.escolhas || [];
  if (choices.length === 0) {
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = "Jogar Novamente";
    
    button.disabled = true;
    button.style.opacity = '0';
    button.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
      button.disabled = false;
      button.style.opacity = '1';
    }, 1500);
    
    button.addEventListener('click', () => {
      startGame();
      if (glassPanel) {
        glassPanel.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    optionButtonsElement.appendChild(button);
  } else {
    choices.forEach(option => {
      let button = document.createElement('button');
      button.classList.add('btn');
      button.innerText = cleanOptionText(option.texto);

      if (enabledOption(option)) {
        button.disabled = true;
        button.style.opacity = '0';
        button.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
          button.disabled = false;
          button.style.opacity = '1';
        }, 1500);

        button.addEventListener('click', () => {
          selectOption(option);
          if (glassPanel) {
            glassPanel.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      } else {
        button.disabled = true;
      }
      optionButtonsElement.appendChild(button);
    });
  }

  inventoryElement.innerHTML = "";
}

function enabledOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  let nextTextNodeId = option.destino;
  state = Object.assign(state, option.setState || {});
  showTextNode(nextTextNodeId);
}

function showCredits(){
  let creditsElement = document.getElementById('game-credits');
  let p = document.createElement('p');
  p.innerText = `${credits.title} \n ${credits.author} \n ${cleanStoryText(credits.description)}`;
  creditsElement.appendChild(p);
}

function playEffectSound(type) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (type === 'explosion') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(120, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1.2);
            gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
        } else if (type === 'death') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(20, audioCtx.currentTime + 1.5);
            gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.5);
        } else if (type === 'boss') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(110, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(165, audioCtx.currentTime + 0.3);
            osc.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.6);
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.0);
        }
    } catch(e) {
        console.warn('AudioContext not supported');
    }
}

window.onload = function() { 
  document.title = credits.title;
  document.getElementById('game-title').innerHTML = credits.title;
  showCredits();
  
  const btnNarrate = document.getElementById('btn-narrate');
  if(btnNarrate) {
    btnNarrate.addEventListener('click', () => {
      const synth = window.speechSynthesis;
      if(synth.speaking && isNarrating) {
        synth.cancel();
        isNarrating = false;
        btnNarrate.innerText = "🔊 Ouvir Cena";
        return;
      }
      synth.cancel();
      const textSections = document.querySelectorAll('#text p');
      let fullText = "";
      textSections.forEach(p => fullText += p.innerText + " . ");
      
      if(fullText.trim() !== "") {
        const utterThis = new SpeechSynthesisUtterance(fullText);
        utterThis.lang = 'pt-BR';
        if (ptVoice) {
          utterThis.voice = ptVoice;
          utterThis.pitch = ptVoice.name.toLowerCase().includes('natural') || ptVoice.name.toLowerCase().includes('online') ? 1.0 : 0.9;
        } else {
          utterThis.pitch = 0.9;
        }
        utterThis.rate = 1.05;
        utterThis.onend = () => {
          isNarrating = false;
          btnNarrate.innerText = "🔊 Ouvir Cena";
        };
        synth.speak(utterThis);
        isNarrating = true;
        btnNarrate.innerText = "🔇 Parar Narração";
      }
    });
  }

  const btnDyslexia = document.getElementById('btn-dyslexia');
  if(btnDyslexia) {
      btnDyslexia.addEventListener('click', () => {
          document.body.classList.toggle('dyslexia-mode');
          const isDys = document.body.classList.contains('dyslexia-mode');
          btnDyslexia.innerText = isDys ? "✖️ Fonte Original" : "👁️ Leitura Fácil";
      });
  }
  
  startGame();
}
