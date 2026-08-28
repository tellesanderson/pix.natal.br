import { credits, textNodes } from './../my-game/game.js';
import { createAdventureSave } from './../../adventure-save.js';

const textElement = document.getElementById('text');
const optionsElement = document.getElementById('options');
const titleElement = document.getElementById('game-title');
const creditsElement = document.getElementById('game-credits');
const adventureSave = createAdventureSave({
  slug: 'o-segredo-do-mosteiro',
  title: 'O Segredo do Mosteiro',
  initialNode: 'intro'
});

// Notepad elements
const btnNotepad = document.getElementById('btn-notepad');
const btnCloseNotepad = document.getElementById('btn-close-notepad');
const notepadSidebar = document.getElementById('notepad-sidebar');
const notepadTextarea = document.getElementById('notepad-textarea');
const notepadStatus = document.getElementById('notepad-status');

let gameState = {};
let audioCtx = null;
let windNode = null;
let windFilter = null;
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
  utterThis.pitch = 0.85; // Slightly lower pitch for medieval tone
  utterThis.rate = 0.95;  // Slightly slower rate for dramatic effect
  
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
    ptVoice = ptVoices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('neural')) || ptVoices[0];
  }
}

if (window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();
}


// Clean [source: XXX] tags, leading numbers, and CYOA instructions
function cleanStoryText(text) {
  if (!text) return "";
  
  // 1. Remove [source: XXX, YYY] tags
  let cleaned = text.replace(/\[source:\s*\d+(?:,\s*\d+)*\]/gi, '');
  
  // 2. Remove leading section numbers (e.g. "1 ", "30 ") at the start
  cleaned = cleaned.replace(/^\s*\d+\s+/, '');
  
  // 3. Remove magic page reference instructions
  const magicPhrases = [
    /,\s*siga\s+as\s+instruções\s+e\s+comece\s+lendo\s+o\s+trecho\s+\d+\.?\s*$/gi,
    /se\s+você\s+aceita\s+este\s+desafio,\s+siga\s+as\s+instruções\s+e\s+comece\s+lendo\s+o\s+trecho\s+\d+\.?/gi,
    /\s*Vá\s+para\s+\d+\.?/gi,
    /\s*leia\s+o\s+trecho\s+\d+\.?/gi,
    /\s*comece\s+lendo\s+o\s+trecho\s+\d+\.?/gi,
    /\s*siga\s+as\s+instruções\s+e\s+comece\s+lendo\s+o\s+trecho\s+\d+\.?/gi
  ];
  
  magicPhrases.forEach(regex => {
    cleaned = cleaned.replace(regex, '');
  });
  
  cleaned = cleaned.trim();
  
  // If we ended up with a trailing comma, convert it to a period
  if (cleaned.endsWith(',')) {
    cleaned = cleaned.slice(0, -1) + '.';
  }
  
  // Restore ending punctuation if it was stripped
  if (cleaned.length > 0 && !/[.!?"]$/.test(cleaned)) {
    cleaned += ".";
  }
  
  return cleaned;
}

// Procedural Audio Synthesizer (Gothic Wind & Bells)
function initAudio() {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
    
    // Start ambient wind
    startWindAmbient();
  } catch (e) {
    console.warn("Web Audio API not supported:", e);
  }
}

function startWindAmbient() {
  if (!audioCtx) return;
  try {
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Fill buffer with Pink Noise (deeper, more wind-like than White Noise)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // rescale
      b6 = white * 0.115926;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    
    // Filter to shape wind sound
    windFilter = audioCtx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.Q.setValueAtTime(3.0, audioCtx.currentTime);
    windFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    
    noise.connect(windFilter);
    windFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noise.start(0);
    windNode = noise;
    
    // Sweep the wind frequency slowly to simulate gusting
    setInterval(() => {
      if (audioCtx && windFilter) {
        const time = audioCtx.currentTime;
        const targetFreq = 150 + Math.random() * 400; // Frequency variation
        windFilter.frequency.exponentialRampToValueAtTime(targetFreq, time + 4);
      }
    }, 4000);
    
  } catch (e) {
    console.warn("Could not start wind synth:", e);
  }
}

function playChurchBell() {
  initAudio();
  if (!audioCtx) return;
  
  try {
    const time = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 6);
    
    // Church bells are made of multiple inharmonic partials
    const frequencies = [95, 143, 190, 255, 342, 456];
    frequencies.forEach((f, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, time);
      
      const partialGain = audioCtx.createGain();
      // Higher frequencies decay faster
      const decayTime = 6 / (idx + 1);
      partialGain.gain.setValueAtTime(0.6 / frequencies.length, time);
      partialGain.gain.exponentialRampToValueAtTime(0.001, time + decayTime);
      
      osc.connect(partialGain);
      partialGain.connect(gain);
      osc.start(time);
      osc.stop(time + 6);
    });
  } catch (e) {
    console.warn("Bell sound failed:", e);
  }
}

function playChoiceSound() {
  initAudio();
  if (!audioCtx) return;
  try {
    // Low, heavy sub-bass note for dungeon atmosphere choice confirmation
    const time = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(65, time); // Low C
    osc.frequency.linearRampToValueAtTime(55, time + 0.3); // Sweep down
    
    gain.gain.setValueAtTime(0.07, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.3);
  } catch (e) {}
}

function startGame() {
  adventureSave.clear();
  gameState = {};
  showTextNode("intro");
}

function showTextNode(nodeId, { persist = true } = {}) {
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
  
  if (cleanedText) {
    // Split by sentence ends or paragraph wraps for readability
    const paragraphs = cleanedText.split(/(?<=\.)\s+(?=[A-Z\-\"✙])/);
    
    paragraphs.forEach((pText, index) => {
      if (pText.trim()) {
        const p = document.createElement('p');
        p.className = 'story-paragraph';
        p.innerText = pText.trim();
        p.style.animationDelay = `${index * 180}ms`;
        textElement.appendChild(p);
      }
    });
  }

  // Render choices
  const choices = textNode.escolhas || [];
  
  if (choices.length === 0) {
    // Game Over or End of Story - play tolling church bell
    playChurchBell();
    
    const restartBtn = document.createElement('button');
    restartBtn.className = 'gothic-btn death-btn';
    restartBtn.innerHTML = '✙ REINICIAR JORNADA ✙';
    restartBtn.addEventListener('click', () => {
      playChoiceSound();
      startGame();
    });
    
    optionsElement.appendChild(restartBtn);
  } else {
    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'gothic-btn';
      
      // Clean "Vá para XX" or similar from options if they slip through
      const cleanedChoiceText = choice.texto
        .replace(/\s*\(?vá\s+para\s+\d+\)?/gi, '')
        .trim();
        
      btn.innerText = cleanedChoiceText;
      btn.style.animationDelay = `${(textElement.children.length * 180) + (index * 120)}ms`;
      
      btn.addEventListener('click', () => {
        playChoiceSound();
        selectOption(choice.destino);
      });
      
      optionsElement.appendChild(btn);
    });
  }

  // Smooth scroll
  const panelContent = document.querySelector('.panel-content');
  if (panelContent) {
    panelContent.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (persist) adventureSave.save(nodeId, gameState);
}

function selectOption(nextId) {
  showTextNode(nextId);
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
      gameState = { ...saved.state };
      showTextNode(saved.nodeId);
    },
    onRestart: startGame
  });
}

// Notepad logic (Expand/Collapse & Autosave)
function setupNotepad() {
  // Load saved notes
  const savedNotes = localStorage.getItem('arkanun_notepad_notes');
  if (savedNotes && notepadTextarea) {
    notepadTextarea.value = savedNotes;
  }
  
  if (btnNotepad && notepadSidebar) {
    btnNotepad.addEventListener('click', () => {
      initAudio();
      notepadSidebar.classList.toggle('active');
    });
  }
  
  if (btnCloseNotepad && notepadSidebar) {
    btnCloseNotepad.addEventListener('click', () => {
      notepadSidebar.classList.remove('active');
    });
  }
  
  // Autosave handling
  if (notepadTextarea && notepadStatus) {
    let saveTimeout;
    notepadTextarea.addEventListener('input', () => {
      notepadStatus.innerText = "Escrevendo...";
      notepadStatus.classList.add('saving');
      
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem('arkanun_notepad_notes', notepadTextarea.value);
        notepadStatus.innerText = "Salvo no Diário";
        notepadStatus.classList.remove('saving');
      }, 1000);
    });
  }
}

function setupCredits() {
  if (creditsElement) {
    creditsElement.innerHTML = `
      <p>✙ SCRIPT: ${credits.title} ✙</p>
      <p>✙ SCENARIO: ARKANUN (TRAMA) ✙</p>
      <p>✙ ACÓLITO: ${credits.author} ✙</p>
    `;
  }
  if (titleElement) {
    titleElement.innerText = credits.title;
  }
}

window.onload = () => {
  setupCredits();
  setupNotepad();
  
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) {
    btnNarrate.addEventListener('click', () => {
      initAudio();
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
  
  resumeOrStartGame();
  
  // Resume AudioContext on body click to satisfy browser policy
  document.body.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, { once: true });
};
