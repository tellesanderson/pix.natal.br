import { credits, textNodes } from './../my-game/game.js';

function cleanStoryText(text) {
  if (!text) return '';
  // Clean backticks as requested by the user
  let cleaned = text.replace(/`/g, '');
  
  // Strip out citation markers if any (e.g. [cite: ...])
  cleaned = cleaned.replace(/\s*\[cite:\s*[^\]]+\]/g, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '');

  const patterns = [
    // Page jump instructions typical in CYOA books
    /\s*Comece\s+lendo\s+o\s+trecho\s+\d+\.?/gi,
    /\s*Vá\s+para\s+\d+\.?/gi,
    /\s*leia\s+o\s+trecho\s+\d+\.?/gi,
    /\s*leia\s+o\s+\d+\.?/gi,
    /\s*Se\s+quiser\s+[^,.]+(?:,\s*|\s+)Vá\s+para\s+\d+\.?/gi,
    /\s*Se\s+prefere\s+[^,.]+(?:,\s*|\s+)Vá\s+para\s+\d+\.?/gi
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
let currentAudio = null;
let currentNodeId = "intro";

function stopAllNarration() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  isNarrating = false;
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) {
    btnNarrate.innerText = "🔊 Ouvir Cena";
  }
}

function usarFallbackNavegador(texto) {
  const synth = window.speechSynthesis;
  if (!synth) {
    stopAllNarration();
    return;
  }
  const utterThis = new SpeechSynthesisUtterance(texto);
  utterThis.lang = 'pt-BR';
  if (ptVoice) {
    utterThis.voice = ptVoice;
    utterThis.pitch = ptVoice.name.toLowerCase().includes('natural') || ptVoice.name.toLowerCase().includes('online') ? 1.0 : 0.9;
  } else {
    utterThis.pitch = 0.9;
  }
  utterThis.rate = 1.02;
  utterThis.onend = () => {
    stopAllNarration();
  };
  utterThis.onerror = () => {
    stopAllNarration();
  };
  synth.speak(utterThis);
}

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
  const spaceNodes = ["intro", "01", "11", "34"];
  const surfaceNodes = [
    "15", "36", "13", "25", "28", "37", "02", "05", "10", "18", "20", "24", 
    "31", "33", "39"
  ];
  const hiveNodes = ["06", "07", "12", "14", "16", "17", "19", "22", "27", "30", "32", "35", "40"];
  const shipNodes = ["03", "04", "08", "21", "23", "26", "29", "38"];

  if (spaceNodes.includes(id)) return 'space_orbit.png';
  if (surfaceNodes.includes(id)) return 'planet_surface.png';
  if (hiveNodes.includes(id)) return 'alien_hive.png';
  if (shipNodes.includes(id)) return 'ship_interior.png';

  return 'space_orbit.png';
}

function showTextNode(textNodeIndex) {
  currentNodeId = textNodeIndex;
  stopAllNarration();

  // Visual effects reset
  document.body.classList.remove('whiteout-explosion');
  glassPanel.classList.remove('matrix-bg', 'glitch-effect');

  // Trigger special sound/visual effects on specific narrative nodes
  if (textNodeIndex === "36" || textNodeIndex === "03") {
      // Spaceship landing/laser blast explosion
      document.body.classList.add('whiteout-explosion');
      playEffectSound('explosion');
  } else if (textNodeIndex === "09" || textNodeIndex === "12" || textNodeIndex === "17" || textNodeIndex === "32") {
      // Violent/acidic death nodes
      glassPanel.classList.add('glitch-effect');
      playEffectSound('death');
  } else if (textNodeIndex === "40") {
      // Climax communication
      document.body.style.filter = "contrast(1.35) saturate(1.3) hue-rotate(50deg)";
      playEffectSound('boss');
  } else {
      document.body.style.filter = "none";
  }

  let textNode = textNodes.find(node => node.id === textNodeIndex);
  if (!textNode) {
    console.error(`Node not found: ${textNodeIndex}`);
    return;
  }

  const bgContainer = document.getElementById('bg-container');
  if (bgContainer) {
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

function showCredits() {
  let creditsElement = document.getElementById('game-credits');
  if (creditsElement) {
    creditsElement.innerHTML = "";
    let p = document.createElement('p');
    p.innerText = `${credits.title} \n ${credits.author} \n ${cleanStoryText(credits.description)}`;
    creditsElement.appendChild(p);
  }
}

function playEffectSound(type) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (type === 'explosion') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(12, audioCtx.currentTime + 1.2);
            gainNode.gain.setValueAtTime(0.7, audioCtx.currentTime);
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
            osc.frequency.linearRampToValueAtTime(10, audioCtx.currentTime + 1.8);
            gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.8);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.8);
        } else if (type === 'boss') {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(180, audioCtx.currentTime + 0.3);
            osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.6);
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
  const titleElem = document.getElementById('game-title');
  if (titleElem) titleElem.innerHTML = credits.title;
  showCredits();
  
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) {
    btnNarrate.addEventListener('click', () => {
      if (isNarrating) {
        stopAllNarration();
        return;
      }
      
      stopAllNarration();
      
      const textSections = document.querySelectorAll('#text p');
      let fullText = "";
      textSections.forEach(p => fullText += p.innerText + " . ");
      
      if (fullText.trim() !== "") {
        isNarrating = true;
        btnNarrate.innerText = "🔇 Parar Narração";

        // Tenta tocar o áudio estático gerado do Edge TTS
        const audioUrl = `./my-game/audio/${currentNodeId}.mp3`;
        currentAudio = new Audio(audioUrl);
        
        currentAudio.onended = () => {
          stopAllNarration();
        };

        currentAudio.onerror = () => {
          console.warn(`Áudio estático não encontrado (${audioUrl}). Usando fallback do navegador...`);
          currentAudio = null;
          usarFallbackNavegador(fullText);
        };

        currentAudio.play().catch(err => {
          console.warn("Falha ao tocar MP3, iniciando fallback:", err);
          usarFallbackNavegador(fullText);
        });
      }
    });
  }

  const btnDyslexia = document.getElementById('btn-dyslexia');
  if (btnDyslexia) {
      btnDyslexia.addEventListener('click', () => {
          document.body.classList.toggle('dyslexia-mode');
          const isDys = document.body.classList.contains('dyslexia-mode');
          btnDyslexia.innerText = isDys ? "✖️ Fonte Original" : "👁️ Leitura Fácil";
      });
  }
  
  startGame();
}
