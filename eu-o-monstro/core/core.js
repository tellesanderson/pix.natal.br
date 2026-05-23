import { credits, textNodes } from './../my-game/game.js';

function cleanText(str) {
  if (!str) return '';
  return str.replace(/\s*\[cite:\s*[^\]]+\]/g, '');
}

function cleanStoryText(text) {
  if (!text) return '';
  let cleaned = text.replace(/\s*\[cite:\s*[^\]]+\]/g, '');
  
  const patterns = [
    /\s*Se\s+você\s+acha\s+que\s+pode\s+sobreviver\s+nesse\s+perigoso\s+futuro,\s+comece\s+lendo\s+o\s+trecho\s+\d+\.?/gi,
    /\s*(?:se\s+)?(?:você\s+e\s+sua\s+moto\s+)?rumam\s+para\s+\d+\.?/gi,
    /\s*Confuso,\s+você\s+vai\s+para\s+\d+\.?/gi,
    /\s*Vá\s+para\s+\d+\.?/gi,
    /\s*(?:se\s+)?(?:você\s+)?(?:quiser|desejar|achar)\s+[^,.]+(?:,\s*|\s+)(?:vá\s+para|leia\s+o\s+trecho|leia\s+o)\s+\d+\.?/gi,
    /\s*(?:se\s+)?(?:você\s+)?(?:quiser|desejar|achar)\s+[^,.]+(?:,\s*|\s+)(?:volte\s+para|retorne\s+para)\s+\d+\.?/gi,
    /\s*(?:se\s+)?(?:você\s+)?(?:quiser|desejar|achar)\s+[^,.]+(?:,\s*|\s+)(?:ir\s+para|ir\s+para\s+o)\s+\d+\.?/gi
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
  const roomNodes = ["intro", "01", "03", "07", "10", "15", "20", "31"];
  const forestNodes = ["13", "17", "21", "26", "36", "39"];
  const umbraNodes = ["04", "08", "12", "18", "19", "23", "25", "29", "32", "34", "37", "38"];
  
  if (roomNodes.includes(id)) return 'werewolf_room.png';
  if (forestNodes.includes(id)) return 'forest_clearing.png';
  if (umbraNodes.includes(id)) return 'umbra_world.png';
  
  // Default/urban/other nodes
  return 'dark_alley.png';
}

function showTextNode(textNodeIndex) {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    isNarrating = false;
    const btn = document.getElementById('btn-narrate');
    if(btn) btn.innerText = "🔊 Ouvir Cena";
  }

  // Reseta efeitos visuais do nó anterior
  document.body.classList.remove('whiteout-explosion');
  glassPanel.classList.remove('matrix-bg', 'glitch-effect');

  // Aplicando efeitos via gatilhos de parágrafos
  if (textNodeIndex === "19") {
      document.body.classList.add('whiteout-explosion');
      // Toca um áudio curto via base64 para representar a explosão/curto
      playEffectSound('explosion');
  } else if (textNodeIndex === "27") {
      glassPanel.classList.add('matrix-bg');
  } else if (textNodeIndex === "39") {
      glassPanel.classList.add('glitch-effect');
      playEffectSound('glitch');
  } else if (textNodeIndex === "40") {
      // Clímax
      document.body.style.filter = "contrast(1.2) saturate(1.5)";
      playEffectSound('boss');
  } else {
      document.body.style.filter = "none";
  }

  let textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  const bgContainer = document.getElementById('bg-container');
  if(bgContainer) {
    bgContainer.style.backgroundImage = `url('./bg/${getBgForId(textNodeIndex)}')`;
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
      
      // Checkpoint Cibernético Style
      if(option.texto && option.texto.includes("SISTEMA CRÍTICO")) {
          button.style.borderColor = "#00f3ff";
          button.style.color = "#00f3ff";
          button.style.boxShadow = "0 0 10px #00f3ff";
      }

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
    // A simple synth audio feedback for demonstration without needing actual mp3 files
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (type === 'explosion') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(100, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1, audioCtx.currentTime + 1);
            gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1);
        } else if (type === 'glitch') {
            const bufferSize = audioCtx.sampleRate * 0.5; // 0.5 seconds
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1; // white noise
            }
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            noise.connect(filter);
            filter.connect(audioCtx.destination);
            noise.start();
        } else if (type === 'boss') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 2);
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
          // Vozes neurais (Online/Natural) soam perfeitas com tom padrão (1.0), as demais soam melhor com tom um pouco mais grave (0.9)
          utterThis.pitch = ptVoice.name.toLowerCase().includes('natural') || ptVoice.name.toLowerCase().includes('online') ? 1.0 : 0.9;
        } else {
          utterThis.pitch = 0.9;
        }
        utterThis.rate = 1.0;
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
