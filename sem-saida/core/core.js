import { credits, textNodes } from './../my-game/game.js';

const imageElement = document.getElementById('image');
const textElement = document.getElementById('text');
const inventoryElement = document.getElementById('inventory');
const optionButtonsElement = document.getElementById('options');
const glassPanel = document.querySelector('.main-glass-panel');

let state = {};
let isNarrating = false;

function startGame() {
  state = {};
  showTextNode(0);
}

function getBgForId(id) {
  const hospitals = [1, 9, 23, 29, 37];
  const streets = [4, 6, 7, 14, 20, 21, 24, 26, 28, 31, 35, 36];
  const indoors = [2, 10, 12, 15, 18, 19, 30, 34];
  const deepWeb = [27, 38, 39];
  const combats = [3, 5, 11, 13, 17, 22, 25, 32, 33, 40];
  
  if(hospitals.includes(id)) return 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
  if(streets.includes(id)) return 'linear-gradient(to bottom, #141e30, #243b55)';
  if(deepWeb.includes(id)) return 'linear-gradient(to bottom, #000000, #0f9b0f)';
  if(combats.includes(id)) return 'linear-gradient(to bottom, #4b1248, #f0c27b)';
  
  // Base 
  return 'linear-gradient(to bottom, #000000, #434343)';
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
  if (textNodeIndex === 19) {
      document.body.classList.add('whiteout-explosion');
      // Toca um áudio curto via base64 para representar a explosão/curto
      playEffectSound('explosion');
  } else if (textNodeIndex === 27) {
      glassPanel.classList.add('matrix-bg');
  } else if (textNodeIndex === 39) {
      glassPanel.classList.add('glitch-effect');
      playEffectSound('glitch');
  } else if (textNodeIndex === 40) {
      // Clímax
      document.body.style.filter = "contrast(1.2) saturate(1.5)";
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
  textNode.paragraphs.forEach(paragraph => {
    let p = document.createElement('p');
    p.innerText = paragraph.text;
    textElement.appendChild(p);
  })

  optionButtonsElement.innerHTML = "";
  textNode.options.forEach(option => {
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = option.text;
    
    // Checkpoint Cibernético Style
    if(option.text.includes("SISTEMA CRÍTICO")) {
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
  })

  inventoryElement.innerHTML = "";
}

function enabledOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  let nextTextNodeId = option.nextText;
  if (nextTextNodeId < 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState || {});
  showTextNode(nextTextNodeId);
}

function showCredits(){
  let creditsElement = document.getElementById('game-credits');
  let p = document.createElement('p');
  p.innerText = `${credits.title} \n ${credits.author} \n ${credits.description}`;
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
        utterThis.pitch = 0.8;
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