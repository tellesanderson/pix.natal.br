import { credits, textNodes } from './../my-game/game.js';
import { createAdventureSave } from './../../adventure-save.js';

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
const adventureSave = createAdventureSave({
  slug: 'eu-o-monstro',
  title: 'Eu, o Monstro',
  initialNode: 'intro'
});

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
  utterThis.rate = 1.0;
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
  adventureSave.clear();
  state = {};
  showTextNode("intro");
}

function getBgForId(id) {
  const roomNodes = ["intro", "01", "03", "07", "10", "15", "20", "31"];
  const forestNodes = ["13", "17", "21", "26", "36", "39"];
  const umbraNodes = ["04", "08", "12", "18", "19", "23", "25", "29", "32", "34", "37", "38"];
  
  if (roomNodes.includes(id)) return 'werewolf_room.webp';
  if (forestNodes.includes(id)) return 'forest_clearing.webp';
  if (umbraNodes.includes(id)) return 'umbra_world.webp';
  
  // Default/urban/other nodes
  return 'dark_alley.webp';
}

function showTextNode(textNodeIndex, { persist = true } = {}) {
  currentNodeId = textNodeIndex;
  stopAllNarration();

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

  if (persist) adventureSave.save(textNodeIndex, state);
}

function enabledOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  let nextTextNodeId = option.destino;
  state = Object.assign(state, option.setState || {});
  showTextNode(nextTextNodeId);
}

function resumeOrStartGame() {
  const saved = adventureSave.load(textNodes);
  if (!saved) {
    startGame();
    return;
  }

  showTextNode('intro', { persist: false });
  adventureSave.offer(saved, {
    onResume: () => {
      state = { ...saved.state };
      showTextNode(saved.nodeId);
    },
    onRestart: startGame
  });
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
      if (isNarrating) {
        stopAllNarration();
        return;
      }
      
      stopAllNarration();
      
      const textSections = document.querySelectorAll('#text p');
      let fullText = "";
      textSections.forEach(p => fullText += p.innerText + " . ");
      
      if(fullText.trim() !== "") {
        isNarrating = true;
        btnNarrate.innerText = "🔇 Parar Narração";

        // Tenta tocar o áudio WebM (Opus) ultra leve com fallback para MP3
        const webmUrl = `./my-game/audio/${currentNodeId}.webm`;
        const mp3Url = `./my-game/audio/${currentNodeId}.mp3`;
        
        currentAudio = new Audio(webmUrl);
        
        currentAudio.onended = () => {
          stopAllNarration();
        };

        const tryMp3Fallback = () => {
          const fallbackMp3 = new Audio(mp3Url);
          fallbackMp3.onended = () => stopAllNarration();
          fallbackMp3.onerror = () => {
            currentAudio = null;
            usarFallbackNavegador(fullText);
          };
          fallbackMp3.play().then(() => {
            currentAudio = fallbackMp3;
          }).catch(() => {
            currentAudio = null;
            usarFallbackNavegador(fullText);
          });
        };

        currentAudio.onerror = tryMp3Fallback;
        currentAudio.play().catch(tryMp3Fallback);
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
  
  resumeOrStartGame();
}
