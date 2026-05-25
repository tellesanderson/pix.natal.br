import { textNodes } from './my-game/game.js';
import fs from 'fs';

const extracted = textNodes.map(node => {
  let text = '';
  if (node.texto) {
    text = node.texto;
  } else if (node.paragraphs) {
    text = node.paragraphs.map(p => p.text).join(' ');
  }
  return {
    id: String(node.id),
    text: text
  };
});

fs.writeFileSync('./my-game/game_text.json', JSON.stringify(extracted, null, 2), 'utf-8');
console.log('Successfully exported game text to game_text.json!');
