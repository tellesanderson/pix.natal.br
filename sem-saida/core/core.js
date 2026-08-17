import { credits, textNodes } from './../my-game/game.js';

const textElement = document.getElementById('text');
const optionsElement = document.getElementById('options');
const titleElement = document.getElementById('game-title');
const creditsElement = document.getElementById('game-credits');

let gameState = {};
let currentAudio = null;
let isNarrating = false;
let ptVoice = null;
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
    btnNarrate.classList.remove('playing');
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
  }
  utterThis.pitch = 1.0;
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
  const ptVoices = voices.filter(v => v.lang.includes('pt-BR') || v.lang.includes('pt-PT') || v.lang.startsWith('pt'));
  
  if (ptVoices.length > 0) {
    // Try to find a Portuguese Neural or Natural voice
    ptVoice = ptVoices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('neural')) || ptVoices[0];
  }
}

if (window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();
}


// Clean cite tags and trailing instruction text
function cleanStoryText(text) {
  if (!text) return "";
  
  // 1. Remove [cite: XX] tags
  let cleaned = text.replace(/\s*\[cite:\s*[^\]]+\]/gi, '');
  
  // 2. Remove magic number instructions/references at the end of the text
  const magicPhrases = [
    /,\s*comece\s+lendo\s+o\s+trecho\s+\d+\.?\s*$/gi,
    /\s*se\s+você\s+acha\s+que\s+pode\s+sobreviver\s+nesse\s+perigoso\s+futuro,\s+comece\s+lendo\s+o\s+trecho\s+\d+\.?\s*$/gi,
    /\s*vá\s+para\s+o\s+trecho\s+\d+\.?\s*$/gi,
    /\s*vá\s+para\s+\d+\.?\s*$/gi,
    /\s*leia\s+o\s+trecho\s+\d+\.?\s*$/gi,
    /\s*volte\s+para\s+\d+\.?\s*$/gi,
    /\s*retorne\s+para\s+\d+\.?\s*$/gi,
    /\s*ir\s+para\s+\d+\.?\s*$/gi
  ];
  
  magicPhrases.forEach(regex => {
    cleaned = cleaned.replace(regex, '');
  });
  
  cleaned = cleaned.trim();
  
  // Restore ending punctuation if it was stripped
  if (cleaned.length > 0 && !/[.!?"]$/.test(cleaned)) {
    cleaned += ".";
  }
  
  return cleaned;
}

// Generate retro synthesizer sounds
function playSynthSound(type) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'click') {
      // Short hi-tech blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'hover') {
      // Subtle tick
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === 'transition') {
      // Futuristic hum sweep
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(300, audioCtx.currentTime + 0.2);
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.2);
      
      osc.disconnect(gain);
      osc.connect(filter);
      filter.connect(gain);
      
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } else if (type === 'gameover') {
      // Low descending synth growl
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.8);
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } else if (type === 'success') {
      // Chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    }
  } catch (e) {
    console.warn("Web Audio API not allowed or supported on this interaction:", e);
  }
}

function startGame() {
  gameState = {};
  showTextNode("intro");
}

function showTextNode(nodeId) {
  currentNodeId = nodeId;
  stopAllNarration();

  const textNode = textNodes.find(node => node.id === nodeId);
  if (!textNode) {
    console.error(`Story node not found: ${nodeId}`);
    return;
  }

  // Clear previous contents
  textElement.innerHTML = '';
  optionsElement.innerHTML = '';

  // Render story paragraphs
  const rawText = textNode.texto || '';
  const cleanedText = cleanStoryText(rawText);
  
  // Split by double newline or single newline to form readable paragraphs
  const paragraphs = cleanedText.split(/\n+/);
  
  paragraphs.forEach((pText, index) => {
    if (pText.trim()) {
      const p = document.createElement('p');
      p.className = 'story-paragraph';
      p.innerText = pText.trim();
      p.style.animationDelay = `${index * 150}ms`;
      textElement.appendChild(p);
    }
  });

  // Render choice buttons
  const choices = textNode.escolhas || [];
  
  if (choices.length === 0) {
    // End of story or dead end - offer restart button
    const restartBtn = document.createElement('button');
    restartBtn.className = 'cyber-btn game-over-btn';
    restartBtn.innerHTML = '<span class="btn-glitch">REBOOT_SYSTEM</span>';
    restartBtn.addEventListener('click', () => {
      playSynthSound('click');
      startGame();
    });
    restartBtn.addEventListener('mouseenter', () => playSynthSound('hover'));
    
    // Play gameover sound or success sound based on node id
    if (nodeId === "40") {
      playSynthSound('success');
    } else {
      playSynthSound('gameover');
    }

    optionsElement.appendChild(restartBtn);
  } else {
    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'cyber-btn';
      btn.innerText = choice.texto;
      btn.style.animationDelay = `${(paragraphs.length * 150) + (index * 100)}ms`;
      
      btn.addEventListener('click', () => {
        playSynthSound('click');
        playSynthSound('transition');
        selectOption(choice.destino);
      });
      btn.addEventListener('mouseenter', () => playSynthSound('hover'));
      
      optionsElement.appendChild(btn);
    });
  }

  // Smooth scroll container to top
  const terminalPanel = document.querySelector('.panel-content');
  if (terminalPanel) {
    terminalPanel.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function selectOption(nextId) {
  showTextNode(nextId);
}

function setupCredits() {
  if (creditsElement) {
    creditsElement.innerHTML = `
      <p>// PROJECT: ${credits.title}</p>
      <p>// AUTHOR: ${credits.author}</p>
      <p>// ENCRYPT: AES-256-CYBER</p>
    `;
  }
  if (titleElement) {
    titleElement.innerText = credits.title;
  }
}

window.onload = () => {
  setupCredits();
  
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) {
    btnNarrate.addEventListener('click', () => {
      if (isNarrating) {
        stopAllNarration();
        return;
      }
      
      stopAllNarration();
      
      const paragraphs = document.querySelectorAll('#text p');
      let textToSpeak = "";
      paragraphs.forEach(p => {
        textToSpeak += p.innerText + " ";
      });
      
      textToSpeak = textToSpeak.trim();
      if (!textToSpeak) return;
      
      isNarrating = true;
      btnNarrate.innerText = "🔇 Parar";
      btnNarrate.classList.add('playing');
      
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
          usarFallbackNavegador(textToSpeak);
        };
        fallbackMp3.play().then(() => {
          currentAudio = fallbackMp3;
        }).catch(() => {
          currentAudio = null;
          usarFallbackNavegador(textToSpeak);
        });
      };
      
      currentAudio.onerror = tryMp3Fallback;
      currentAudio.play().catch(tryMp3Fallback);
    });
  }
  
  startGame();
};
