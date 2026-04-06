import { credits, textNodes } from './../my-game/game.js';

const imageElement = document.getElementById('image');
const textElement = document.getElementById('text');
const inventoryElement = document.getElementById('inventory');
const optionButtonsElement = document.getElementById('options');

let state = {};

function startGame() {
  state = {};
  showTextNode(0);
}

function getBgForId(id) {
  const chases = [2, 9, 12, 13, 15, 17, 22, 30, 32, 39, 40];
  const prisons = [3, 8, 26, 36, 37];
  const bars = [0, 1, 4, 5, 14, 18, 21, 25, 27, 28, 31, 35];
  const confronts = [6, 7, 10, 11, 16, 19, 20, 23, 24, 29, 34, 38];
  
  if(chases.includes(id)) return 'mustang_chase.png';
  if(prisons.includes(id)) return 'cold_prison.png';
  if(bars.includes(id)) return 'punk_rock_bar.png';
  if(confronts.includes(id)) return 'vampire_confront.png';
  return 'dark_streets.png';
}

function showTextNode(textNodeIndex) {

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
      button.addEventListener('click', () => {
        selectOption(option);
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
  startGame();
}