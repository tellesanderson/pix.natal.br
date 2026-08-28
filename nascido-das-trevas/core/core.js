import { credits, textNodes } from './../my-game/game.js';
import { createAdventureSave } from './../../adventure-save.js';

const imageElement = document.getElementById('image');
const textElement = document.getElementById('text');
const inventoryElement = document.getElementById('inventory');
const optionButtonsElement = document.getElementById('options');
const adventureSave = createAdventureSave({
  slug: 'nascido-das-trevas',
  title: 'Nascido das Trevas',
  initialNode: 0
});

let state = {};
let isNarrating = false;
let ptVoice = null;
let currentAudio = null;
let currentNodeId = 0;

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
    utterThis.pitch = ptVoice.name.toLowerCase().includes('natural') || ptVoice.name.toLowerCase().includes('online') ? 1.0 : 0.8;
  } else {
    utterThis.pitch = 0.8;
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

function startGame() {
  adventureSave.clear();
  state = {};
  showTextNode(0);
}

function getBgForId(id) {
  const chases = [2, 9, 12, 13, 15, 17, 22, 30, 32, 39, 40];
  const prisons = [3, 8, 26, 36, 37];
  const bars = [0, 1, 4, 5, 14, 18, 21, 25, 27, 28, 31, 35];
  const confronts = [6, 7, 10, 11, 16, 19, 20, 23, 24, 29, 34, 38];
  
  if(chases.includes(id)) return 'mustang_chase.webp';
  if(prisons.includes(id)) return 'cold_prison.webp';
  if(bars.includes(id)) return 'punk_rock_bar.webp';
  if(confronts.includes(id)) return 'vampire_confront.webp';
  return 'dark_streets.webp';
}

function showTextNode(textNodeIndex, { persist = true } = {}) {
  currentNodeId = textNodeIndex;
  stopAllNarration();

  //return text node by index
  let textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  const bgContainer = document.getElementById('bg-container');
  if(bgContainer) {
    bgContainer.style.backgroundImage = `url('./bg/${getBgForId(textNodeIndex)}')`;
  }

  //set new image
  imageElement.innerHTML = "";
  if (textNode.img) {
    let img = document.createElement('img');
    img.src = `./my-game/images/scenes/${textNode.img}`;
    imageElement.appendChild(img);
  }

  //set new paragraphs
  textElement.innerHTML = "";
  textNode.paragraphs.forEach(paragraph => {
    let p = document.createElement('p');
    p.innerText = paragraph.text;
    textElement.appendChild(p);
  })

  //set new option buttons
  optionButtonsElement.innerHTML = "";
  textNode.options.forEach(option => {
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = option.text;
    if (enabledOption(option)) {
      // Impede duplo-clique imediato colocando delay
      button.disabled = true;
      button.style.opacity = '0';
      button.style.transition = 'opacity 0.8s ease';
      
      setTimeout(() => {
        button.disabled = false;
        button.style.opacity = '1';
      }, 1500); // 1.5s de carência

      button.addEventListener('click', () => {
        selectOption(option);
        // Rola a caixa flutuante (.main-glass-panel) em vez da Window nativa
        const glassPanel = document.querySelector('.main-glass-panel');
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

  //show inventory items
  inventoryElement.innerHTML = "";

  if (textNodeIndex > 0) {
    let h4 = document.createElement('h4');
    h4.innerText = "Seus Itens";
    inventoryElement.appendChild(h4);

    let ul = document.createElement('ul');
    inventoryElement.appendChild(ul);

    let inv = Object.keys(state).filter(function(k){return state[k]});
    if(inv.length){
      inv.forEach(i => {
        let li = document.createElement('li');
        li.innerText = i;
        ul.appendChild(li);
      })
    } else {
      let li = document.createElement('li');
      li.innerText = 'Você não possui itens';
      ul.appendChild(li);
    }
  }

  if (persist) adventureSave.save(textNodeIndex, state);
}

function enabledOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  let nextTextNodeId = option.nextText;
  if (nextTextNodeId < 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

function resumeOrStartGame() {
  const saved = adventureSave.load(textNodes);
  if (!saved) {
    startGame();
    return;
  }

  showTextNode(0, { persist: false });
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
  p.innerText = `${credits.title} \n ${credits.author} \n ${credits.description}`;
  creditsElement.appendChild(p);
  Object.keys(credits.links).forEach(key => {
    let a = document.createElement('a');
    var link = document.createTextNode(key);
    a.appendChild(link); 
    a.title = key; 
    a.href = credits.links[key];    
    creditsElement.appendChild(a);
  })
}

window.onload = function() { 
  document.title = credits.title;
  document.getElementById('game-title').innerHTML = credits.title;
  showCredits()
  
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
  scheduleBats();
}

// =============================
// EFEITOS ESPECIAIS (MORCEGOS)
// =============================
function spawnBat() {
    const bat = document.createElement('div');
    bat.innerText = "🦇";
    bat.classList.add('bat-animation');
    
    // Posicao Vertical e Tamanho Aleatorios
    const startY = Math.random() * 80 + 5; 
    const duration = Math.random() * 10 + 10; // 10 a 20 segundos pra cruzar a tela devagar
    
    bat.style.top = startY + "vh";
    bat.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
    bat.style.animationDuration = duration + "s, 0.5s"; 
    
    // 50% de chance de vir da Direita pra Esquerda
    if(Math.random() > 0.5) {
        bat.style.animationName = "flyBatReverse, flapWobble";
        // Espelhar morcego na direcao do voo
        bat.style.transform = "scaleX(-1)";
    }
    
    document.body.appendChild(bat);
    
    setTimeout(() => {
        bat.remove(); // limpar da tela para nao pesar a memoria
    }, duration * 1000);
}

function scheduleBats() {
    // Spawna um morcego entre cada 8 a 15 segundos aleatoriamente
    setTimeout(() => {
        spawnBat();
        scheduleBats();
    }, Math.random() * 7000 + 8000);
}
