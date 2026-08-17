import { credits, textNodes } from './../my-game/game.js';

const imageElement = document.getElementById('image');
const textElement = document.getElementById('text');
const inventoryElement = document.getElementById('inventory');
const optionButtonsElement = document.getElementById('options');

let state = {};
let isNarrating = false;
let ptVoice = null;

function loadVoices() {
  if (!window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  const ptBRVoices = voices.filter(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR') || v.lang.startsWith('pt'));
  if (ptBRVoices.length > 0) {
    ptVoice = ptBRVoices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('online')) || ptBRVoices[0];
  }
}

if (window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();
}

function stopNarration() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  isNarrating = false;
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) btnNarrate.innerText = "🔊 Narração";
}

function toggleNarration() {
  if (isNarrating) {
    stopNarration();
    return;
  }
  const synth = window.speechSynthesis;
  if (!synth) return;

  const paragraphs = textElement.querySelectorAll('p');
  let fullText = "";
  paragraphs.forEach(p => fullText += p.innerText + " ");
  if (!fullText.trim()) return;

  stopNarration();

  const utter = new SpeechSynthesisUtterance(fullText);
  utter.lang = 'pt-BR';
  if (ptVoice) utter.voice = ptVoice;
  utter.rate = 1.0;
  utter.pitch = 0.95;

  isNarrating = true;
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) btnNarrate.innerText = "🔇 Parar";

  utter.onend = () => stopNarration();
  utter.onerror = () => stopNarration();

  synth.speak(utter);
}

function startGame() {
  state = {};
  showTextNode(0);
}

function showTextNode(textNodeIndex) {
  stopNarration();

  // Return text node by index
  let textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  if (!textNode) return;

  // Set new image (WebP with fallback)
  imageElement.innerHTML = "";
  if (textNode.img) {
    let img = document.createElement('img');
    const webpImg = textNode.img.replace('.gif', '.webp');
    img.src = `./my-game/images/scenes/${webpImg}`;
    img.alt = "Cena da aventura Jovem Guerreiro";
    img.loading = "lazy";
    img.onerror = () => { img.src = `./my-game/images/scenes/${textNode.img}`; };
    imageElement.appendChild(img);
  }

  // Set new paragraphs
  textElement.innerHTML = "";
  textNode.paragraphs.forEach(paragraph => {
    let p = document.createElement('p');
    p.innerText = paragraph.text;
    textElement.appendChild(p);
  });

  // Set new option buttons
  optionButtonsElement.innerHTML = "";
  textNode.options.forEach(option => {
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = option.text;
    if (enabledOption(option)) {
      button.addEventListener('click', () => {
        selectOption(option);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      button.disabled = true;
    }
    optionButtonsElement.appendChild(button);
  });

  // Show inventory items
  inventoryElement.innerHTML = "";

  if (textNodeIndex > 0) {
    let h4 = document.createElement('h4');
    h4.innerText = "🎒 Seus Itens";
    inventoryElement.appendChild(h4);

    let ul = document.createElement('ul');
    inventoryElement.appendChild(ul);

    let inv = Object.keys(state).filter(function(k){return state[k]});
    if(inv.length){
      inv.forEach(i => {
        let li = document.createElement('li');
        li.innerText = i;
        ul.appendChild(li);
      });
    } else {
      let li = document.createElement('li');
      li.innerText = 'Você não possui itens no momento.';
      ul.appendChild(li);
    }
  }
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

function showCredits(){
  let creditsElement = document.getElementById('game-credits');
  if (!creditsElement) return;
  let p = document.createElement('p');
  p.innerText = `${credits.title} \n ${credits.author} \n ${credits.description}`;
  creditsElement.appendChild(p);
  if (credits.links) {
    Object.keys(credits.links).forEach(key => {
      let a = document.createElement('a');
      var link = document.createTextNode(key);
      a.appendChild(link); 
      a.title = key; 
      a.href = credits.links[key];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      creditsElement.appendChild(a);
    });
  }
}

window.onload = function() { 
  document.title = `${credits.title} | Crônicas RPG`;
  const titleEl = document.getElementById('game-title');
  if (titleEl) titleEl.innerText = credits.title;
  showCredits();
  
  // Accessibility dyslexia toggle
  const btnDyslexia = document.getElementById('btn-dyslexia');
  if (btnDyslexia) {
    btnDyslexia.addEventListener('click', () => {
      document.body.classList.toggle('dyslexia-font');
    });
  }

  // Narration button
  const btnNarrate = document.getElementById('btn-narrate');
  if (btnNarrate) {
    btnNarrate.addEventListener('click', toggleNarration);
  }

  startGame();
};