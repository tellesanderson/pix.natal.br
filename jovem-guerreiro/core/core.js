import { credits, textNodes } from './../my-game/game.js';

const SAVE_KEY = 'cronicas-jovem-guerreiro-save-v2';
const SETTINGS_KEY = 'cronicas-jovem-guerreiro-settings-v2';
const MAX_HISTORY = 30;
const MAX_JOURNAL = 12;

const byId = (id) => document.getElementById(id);

const ui = {
  image: byId('image'),
  text: byId('text'),
  inventory: byId('inventory'),
  options: byId('options'),
  storyScroll: byId('story-scroll'),
  sceneTitle: byId('scene-title'),
  sceneNumber: byId('scene-number'),
  chapterLabel: byId('chapter-label'),
  questTitle: byId('quest-title'),
  questDescription: byId('quest-description'),
  progressLabel: byId('progress-label'),
  progressBar: byId('progress-bar'),
  progressTrack: document.querySelector('.progress-track'),
  visitedCount: byId('visited-count'),
  decisionCount: byId('decision-count'),
  itemCount: byId('item-count'),
  journal: byId('journal-list'),
  saveStatus: byId('save-status'),
  toast: byId('toast'),
  sidebar: byId('journey-panel'),
  scrim: byId('mobile-scrim'),
  btnSidebar: byId('btn-sidebar'),
  btnCloseSidebar: byId('btn-close-sidebar'),
  btnUndo: byId('btn-undo'),
  btnRestart: byId('btn-restart'),
  btnNarrate: byId('btn-narrate'),
  btnSound: byId('btn-sound'),
  btnSettings: byId('btn-settings'),
  resumeDialog: byId('resume-dialog'),
  resumeDescription: byId('resume-description'),
  btnResume: byId('btn-resume-game'),
  btnNewGame: byId('btn-new-game'),
  settingsDialog: byId('settings-dialog'),
  restartDialog: byId('restart-dialog'),
  btnConfirmRestart: byId('btn-confirm-restart'),
  settingReadable: byId('setting-readable'),
  settingContrast: byId('setting-contrast'),
  settingMotion: byId('setting-motion'),
  fontSizeControl: byId('font-size-control'),
  credits: byId('game-credits')
};

const ITEM_META = {
  mantoVermelho: { label: 'Manto vermelho', symbol: '◩' },
  adagaEnferrujada: { label: 'Adaga enferrujada', symbol: '†' },
  ouro: { label: 'Moedas de ouro', symbol: '●' },
  'maça': { label: 'Maçã', symbol: '◆' },
  colarVerde: { label: 'Colar de pedra verde', symbol: '◇' },
  madeiraEsculpida: { label: 'Madeira esculpida', symbol: '⌁' },
  cajado: { label: 'Cajado do anão', symbol: '╱' },
  liquidoVermelho: { label: 'Líquido vermelho', symbol: '◉' },
  liquidoVerde: { label: 'Líquido verde', symbol: '◉' }
};

const WATER_SCENES = new Set([2, 21, 30, 38, 40, 48, 49, 50]);
const TOXIC_SCENES = new Set([29, 34, 36, 37, 42, 43, 44, 54, 60]);
const SPECTRAL_SCENES = new Set([6, 53, 61, 64, 65, 69, 70, 74]);
const DANGER_SCENES = new Set([7, 9, 17, 18, 21, 24, 27, 28, 31, 45, 52, 58, 64, 71]);
const FINAL_SCENES = new Set([66, 68, 71, 72, 73]);
const DEATH_SCENES = new Set([21, 24, 27, 45, 48, 54, 64, 71]);

let state = {};
let currentNodeId = 0;
let visited = new Set();
let decisionCount = 0;
let journalEntries = [];
let historyStack = [];
let saveCandidate = null;
let saveStatusTimer = null;
let toastTimer = null;
let narrationActive = false;
let portugueseVoice = null;
let soundEnabled = false;

let preferences = {
  fontSize: 'medium',
  readable: false,
  contrast: false,
  reduceMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
};

function safeRead(key) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn('Não foi possível ler o salvamento local.', error);
    return null;
  }
}

function safeWrite(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('Não foi possível salvar a jornada localmente.', error);
    return false;
  }
}

function safeRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn('Não foi possível remover o salvamento local.', error);
  }
}

function setControl(button, { icon, label, title, pressed }) {
  if (!button) return;
  const spans = button.querySelectorAll('span');
  if (spans[0] && icon) spans[0].textContent = icon;
  if (spans[1] && label) spans[1].textContent = label;
  if (title) button.title = title;
  if (typeof pressed === 'boolean') button.setAttribute('aria-pressed', String(pressed));
}

function activeItemKeys(source = state) {
  return Object.keys(ITEM_META).filter((key) => Boolean(source[key]));
}

function getSceneInfo(id) {
  if (id === 0) return { mood: 'threshold', chapter: 'Prólogo', title: 'Antes da jornada' };
  if (id === 1 || id === 76) return { mood: 'danger', chapter: 'O chamado', title: 'A noite em que tudo mudou' };
  if (id === 77) return { mood: 'threshold', chapter: 'A Caverna Negra', title: 'O limiar da escuridão' };
  if (id === 75) return { mood: 'ending', chapter: 'Epílogo', title: 'O despertar' };
  if (DEATH_SCENES.has(id)) return { mood: 'danger', chapter: 'Destino selado', title: 'Fim da jornada' };
  if (FINAL_SCENES.has(id)) return { mood: 'final', chapter: 'Diante da lenda', title: 'O salão do altar' };
  if (SPECTRAL_SCENES.has(id)) return { mood: 'spectral', chapter: 'A Caverna Negra', title: 'Ecos do outro mundo' };
  if (WATER_SCENES.has(id)) return { mood: 'water', chapter: 'A Caverna Negra', title: 'Sob águas escuras' };
  if (TOXIC_SCENES.has(id)) return { mood: 'toxic', chapter: 'A Caverna Negra', title: 'Alquimia e armadilhas' };
  if (DANGER_SCENES.has(id)) return { mood: 'danger', chapter: 'A Caverna Negra', title: 'Perigo nas profundezas' };
  return { mood: 'cave', chapter: 'A Caverna Negra', title: 'Caminhos na escuridão' };
}

function getQuest(id) {
  if (id === 0) {
    return ['Atenda ao chamado', 'Uma aventura aguarda além da primeira escolha.'];
  }
  if (id === 1 || id === 76) {
    return ['Siga até a Caverna Negra', 'Descubra quem levou seu pai — e por quê.'];
  }
  if (id === 75) {
    return ['Jornada concluída', 'A lenda revelou seu último segredo.'];
  }
  if (DEATH_SCENES.has(id)) {
    return ['Sua jornada terminou', 'Recomece ou volte uma decisão para tentar outro caminho.'];
  }
  if (FINAL_SCENES.has(id)) {
    return ['Salve seu pai', 'A verdade e a lenda estão diante de você.'];
  }
  return ['Encontre seu pai', 'A Caverna Negra esconde o caminho — e a verdade.'];
}

function showToast(message) {
  if (!ui.toast) return;
  window.clearTimeout(toastTimer);
  ui.toast.textContent = message;
  ui.toast.hidden = false;
  requestAnimationFrame(() => ui.toast.classList.add('is-visible'));
  toastTimer = window.setTimeout(() => {
    ui.toast.classList.remove('is-visible');
    window.setTimeout(() => { ui.toast.hidden = true; }, 220);
  }, 2600);
}

function updateSaveStatus(text) {
  if (!ui.saveStatus) return;
  window.clearTimeout(saveStatusTimer);
  ui.saveStatus.textContent = text;
  if (text === 'Salvo agora') {
    saveStatusTimer = window.setTimeout(() => {
      ui.saveStatus.textContent = 'Salvamento automático';
    }, 2200);
  }
}

function persistGame() {
  const payload = {
    version: 2,
    currentNodeId,
    state,
    visited: [...visited],
    decisionCount,
    journalEntries: journalEntries.slice(-MAX_JOURNAL),
    historyStack: historyStack.slice(-MAX_HISTORY),
    savedAt: new Date().toISOString()
  };

  if (safeWrite(SAVE_KEY, payload)) updateSaveStatus('Salvo agora');
}

function validSave(save) {
  return Boolean(
    save &&
    save.version === 2 &&
    Number.isInteger(save.currentNodeId) &&
    textNodes.some((node) => node.id === save.currentNodeId) &&
    save.state && typeof save.state === 'object'
  );
}

function restoreGame(save) {
  state = { ...save.state };
  currentNodeId = save.currentNodeId;
  visited = new Set(Array.isArray(save.visited) ? save.visited : [currentNodeId]);
  decisionCount = Number.isFinite(save.decisionCount) ? save.decisionCount : 0;
  journalEntries = Array.isArray(save.journalEntries) ? save.journalEntries.slice(-MAX_JOURNAL) : [];
  historyStack = Array.isArray(save.historyStack) ? save.historyStack.slice(-MAX_HISTORY) : [];
  showTextNode(currentNodeId, { persist: false, focus: false });
  updateSaveStatus('Jornada retomada');
  showToast('Sua jornada foi retomada.');
}

function startNewGame({ announce = false } = {}) {
  stopNarration();
  state = {};
  currentNodeId = 0;
  visited = new Set();
  decisionCount = 0;
  journalEntries = [];
  historyStack = [];
  saveCandidate = null;
  safeRemove(SAVE_KEY);
  showTextNode(0, { persist: false, focus: false });
  updateSaveStatus('Pronto para começar');
  if (announce) showToast('Uma nova jornada começou.');
}

function renderImage(textNode) {
  ui.image.replaceChildren();
  ui.image.classList.remove('modern-opening');
  if (!textNode.img) return;

  const img = document.createElement('img');
  const webpName = textNode.img.replace(/\.gif$/i, '.webp');
  img.decoding = 'async';

  if (textNode.id === 0) {
    const title = document.createElement('div');
    const name = document.createElement('span');
    const subtitle = document.createElement('span');

    ui.image.classList.add('modern-opening');
    img.src = './my-game/images/scenes/scene-00-modern.png';
    img.alt = 'Jovem guerreiro loiro segurando uma espada diante da escuridão';
    img.width = 1983;
    img.height = 793;

    title.className = 'opening-title-overlay';
    title.setAttribute('aria-hidden', 'true');
    name.className = 'opening-title-name';
    name.textContent = 'Jovem Guerreiro';
    subtitle.className = 'opening-title-subtitle';
    subtitle.textContent = 'Aventura Solo';
    title.append(name, subtitle);

    img.onerror = () => {
      img.onerror = null;
      ui.image.classList.remove('modern-opening');
      title.remove();
      img.src = `./my-game/images/scenes/${webpName}`;
      img.alt = 'Arte clássica de abertura de Jovem Guerreiro';
      img.width = 500;
      img.height = 141;
    };
    ui.image.append(img, title);
    return;
  }

  img.src = `./my-game/images/scenes/${webpName}`;
  img.alt = 'Cena da aventura Jovem Guerreiro';
  img.onerror = () => {
    img.onerror = null;
    img.src = `./my-game/images/scenes/${textNode.img}`;
  };
  ui.image.appendChild(img);
}

function renderStory(textNode) {
  ui.text.replaceChildren();
  textNode.paragraphs.forEach((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph.text;
    ui.text.appendChild(element);
  });
}

function enabledOption(option) {
  try {
    return option.requiredState == null || Boolean(option.requiredState(state));
  } catch (error) {
    console.warn('Não foi possível avaliar uma escolha.', error);
    return false;
  }
}

function renderOptions(textNode) {
  ui.options.replaceChildren();

  textNode.options.forEach((option, index) => {
    const available = enabledOption(option);
    const button = document.createElement('button');
    const number = document.createElement('span');
    const label = document.createElement('span');
    const arrow = document.createElement('span');

    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.choiceIndex = String(index + 1);
    button.disabled = !available;
    if (!available) button.title = 'Esta escolha exige algo que você ainda não possui.';

    number.className = 'choice-number';
    number.textContent = String(index + 1).padStart(2, '0');
    number.setAttribute('aria-hidden', 'true');

    label.className = 'choice-label';
    label.textContent = option.text;

    arrow.className = 'choice-arrow';
    arrow.textContent = available ? '→' : '◇';
    arrow.setAttribute('aria-hidden', 'true');

    button.append(number, label, arrow);
    if (available) button.addEventListener('click', () => selectOption(option));
    ui.options.appendChild(button);
  });
}

function renderInventory() {
  ui.inventory.replaceChildren();
  const heading = document.createElement('div');
  const title = document.createElement('h3');
  const count = document.createElement('span');
  const items = activeItemKeys();

  heading.className = 'section-heading';
  title.className = 'inventory-title';
  title.textContent = 'Seus itens';
  count.textContent = `${items.length} / ${Object.keys(ITEM_META).length}`;
  heading.append(title, count);
  ui.inventory.appendChild(heading);

  if (!items.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-inventory';
    empty.textContent = currentNodeId === 0 ? 'Sua mochila ainda está vazia.' : 'Você não possui itens no momento.';
    ui.inventory.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'inventory-grid';
  items.forEach((key) => {
    const item = document.createElement('div');
    const symbol = document.createElement('span');
    const label = document.createElement('span');
    item.className = 'inventory-item';
    item.title = ITEM_META[key].label;
    symbol.textContent = ITEM_META[key].symbol;
    symbol.setAttribute('aria-hidden', 'true');
    label.textContent = ITEM_META[key].label;
    item.append(symbol, label);
    grid.appendChild(item);
  });
  ui.inventory.appendChild(grid);
}

function renderJournal() {
  ui.journal.replaceChildren();
  const entries = journalEntries.slice(-5).reverse();

  if (!entries.length) {
    const empty = document.createElement('li');
    empty.textContent = 'O primeiro passo ainda será escrito.';
    ui.journal.appendChild(empty);
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = entry.choice;
    item.title = entry.choice;
    ui.journal.appendChild(item);
  });
}

function renderProgress() {
  const percent = Math.min(100, Math.round((visited.size / textNodes.length) * 100));
  const items = activeItemKeys().length;
  ui.progressLabel.textContent = `${percent}%`;
  ui.progressBar.style.width = `${percent}%`;
  ui.progressTrack?.setAttribute('aria-valuenow', String(percent));
  ui.visitedCount.textContent = String(visited.size);
  ui.decisionCount.textContent = String(decisionCount);
  ui.itemCount.textContent = String(items);
  ui.btnUndo.disabled = historyStack.length === 0;
}

function renderSceneMeta(id) {
  const scene = getSceneInfo(id);
  const [questTitle, questDescription] = getQuest(id);
  document.body.dataset.mood = scene.mood;
  document.body.dataset.scene = String(id);
  ui.chapterLabel.textContent = scene.chapter;
  ui.sceneTitle.textContent = scene.title;
  ui.sceneNumber.textContent = String(id).padStart(2, '0');
  ui.questTitle.textContent = questTitle;
  ui.questDescription.textContent = questDescription;
  ambience.update(scene.mood);
}

function showTextNode(textNodeId, { persist = true, focus = true } = {}) {
  const textNode = textNodes.find((node) => node.id === textNodeId);
  if (!textNode) {
    showToast('Este caminho não pôde ser encontrado.');
    return;
  }

  stopNarration();
  currentNodeId = textNodeId;
  visited.add(textNodeId);
  renderSceneMeta(textNodeId);
  renderImage(textNode);
  renderStory(textNode);
  renderOptions(textNode);
  renderInventory();
  renderJournal();
  renderProgress();

  ui.storyScroll.scrollTo({ top: 0, behavior: preferences.reduceMotion ? 'auto' : 'smooth' });
  if (focus && window.matchMedia('(min-width: 901px)').matches) {
    window.setTimeout(() => ui.sceneTitle.focus({ preventScroll: true }), preferences.reduceMotion ? 0 : 180);
  }
  if (persist) persistGame();
}

function cleanJournalText(text) {
  const compact = text.replace(/\s+/g, ' ').trim();
  return compact.length > 78 ? `${compact.slice(0, 75)}…` : compact;
}

function selectOption(option) {
  if (!enabledOption(option)) return;
  const nextId = option.nextText;

  if (nextId < 0) {
    startNewGame({ announce: true });
    return;
  }

  const previousItems = new Set(activeItemKeys());
  historyStack.push({
    nodeId: currentNodeId,
    state: { ...state },
    decisionCount,
    journalEntries: journalEntries.slice(-MAX_JOURNAL)
  });
  historyStack = historyStack.slice(-MAX_HISTORY);

  if (option.setState) state = { ...state, ...option.setState };
  decisionCount += 1;
  journalEntries.push({
    from: currentNodeId,
    to: nextId,
    choice: cleanJournalText(option.text)
  });
  journalEntries = journalEntries.slice(-MAX_JOURNAL);

  const newItems = activeItemKeys().filter((key) => !previousItems.has(key));
  if (newItems.length) {
    ambience.cue('item');
    const names = newItems.map((key) => ITEM_META[key].label).join(', ');
    showToast(`${names} adicionado${newItems.length > 1 ? 's' : ''} à jornada.`);
  } else {
    ambience.cue(getSceneInfo(nextId).mood === 'danger' ? 'danger' : 'choice');
  }

  if (navigator.vibrate) navigator.vibrate(8);
  showTextNode(nextId);
  closeSidebar();
}

function undoLastChoice() {
  const snapshot = historyStack.pop();
  if (!snapshot) return;
  stopNarration();
  state = { ...snapshot.state };
  decisionCount = snapshot.decisionCount;
  journalEntries = Array.isArray(snapshot.journalEntries) ? snapshot.journalEntries : [];
  showTextNode(snapshot.nodeId, { persist: true, focus: false });
  showToast('Você voltou uma decisão. As descobertas foram mantidas.');
}

function openSidebar() {
  document.body.classList.add('sidebar-open');
  ui.btnSidebar.setAttribute('aria-expanded', 'true');
  ui.scrim.hidden = false;
  window.setTimeout(() => ui.btnCloseSidebar.focus(), 50);
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  ui.btnSidebar.setAttribute('aria-expanded', 'false');
  ui.scrim.hidden = true;
}

function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

function loadVoices() {
  if (!window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  const portuguese = voices.filter((voice) => /^pt(?:-|_)/i.test(voice.lang));
  portugueseVoice = portuguese.find((voice) => /natural|online|google/i.test(voice.name)) || portuguese[0] || null;
}

function stopNarration() {
  window.speechSynthesis?.cancel();
  narrationActive = false;
  setControl(ui.btnNarrate, {
    icon: '◖))',
    label: 'Ouvir',
    title: 'Ouvir esta cena',
    pressed: false
  });
}

function toggleNarration() {
  if (!window.speechSynthesis) {
    showToast('A narração não está disponível neste navegador.');
    return;
  }
  if (narrationActive) {
    stopNarration();
    return;
  }

  const node = textNodes.find((item) => item.id === currentNodeId);
  if (!node) return;
  stopNarration();
  const utterance = new SpeechSynthesisUtterance(node.paragraphs.map((item) => item.text).join(' '));
  utterance.lang = 'pt-BR';
  utterance.rate = 0.96;
  utterance.pitch = 0.92;
  if (portugueseVoice) utterance.voice = portugueseVoice;
  utterance.onend = stopNarration;
  utterance.onerror = stopNarration;
  narrationActive = true;
  setControl(ui.btnNarrate, {
    icon: '■',
    label: 'Parar',
    title: 'Parar narração',
    pressed: true
  });
  window.speechSynthesis.speak(utterance);
}

class AmbientSound {
  constructor() {
    this.context = null;
    this.master = null;
    this.noiseGain = null;
    this.filter = null;
    this.hum = null;
    this.humGain = null;
    this.mood = 'threshold';
  }

  async start() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      showToast('O ambiente sonoro não está disponível neste navegador.');
      return false;
    }

    if (!this.context) this.build(new AudioContextClass());
    if (this.context.state === 'suspended') await this.context.resume();
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0.62, now, 0.12);
    this.update(this.mood);
    return true;
  }

  build(context) {
    this.context = context;
    this.master = context.createGain();
    this.master.gain.value = 0.0001;
    this.master.connect(context.destination);

    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;

    const noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    this.filter = context.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.noiseGain = context.createGain();
    noise.connect(this.filter).connect(this.noiseGain).connect(this.master);
    noise.start();

    this.hum = context.createOscillator();
    this.hum.type = 'sine';
    this.humGain = context.createGain();
    this.hum.connect(this.humGain).connect(this.master);
    this.hum.start();
  }

  stop() {
    if (!this.context || !this.master) return;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0.0001, now, 0.08);
  }

  update(mood) {
    this.mood = mood;
    if (!this.context || !this.filter || !soundEnabled) return;
    const profiles = {
      threshold: [380, 0.032, 58, 0.012],
      cave: [260, 0.045, 48, 0.016],
      water: [510, 0.052, 44, 0.018],
      toxic: [330, 0.044, 63, 0.014],
      spectral: [680, 0.035, 72, 0.018],
      danger: [220, 0.052, 41, 0.021],
      final: [180, 0.055, 38, 0.024],
      ending: [480, 0.025, 55, 0.01]
    };
    const [cutoff, noiseLevel, humFrequency, humLevel] = profiles[mood] || profiles.cave;
    const now = this.context.currentTime;
    this.filter.frequency.setTargetAtTime(cutoff, now, 0.6);
    this.noiseGain.gain.setTargetAtTime(noiseLevel, now, 0.6);
    this.hum.frequency.setTargetAtTime(humFrequency, now, 0.6);
    this.humGain.gain.setTargetAtTime(humLevel, now, 0.6);
  }

  cue(type = 'choice') {
    if (!soundEnabled || !this.context || this.context.state !== 'running') return;
    const now = this.context.currentTime;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const config = {
      choice: [180, 245, 0.11, 'sine'],
      item: [330, 610, 0.26, 'triangle'],
      danger: [92, 45, 0.42, 'sawtooth']
    }[type] || [180, 245, 0.11, 'sine'];
    oscillator.type = config[3];
    oscillator.frequency.setValueAtTime(config[0], now);
    oscillator.frequency.exponentialRampToValueAtTime(config[1], now + config[2]);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + config[2]);
    oscillator.connect(gain).connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + config[2] + 0.02);
  }
}

const ambience = new AmbientSound();

async function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    const started = await ambience.start();
    if (!started) soundEnabled = false;
  } else {
    ambience.stop();
  }
  setControl(ui.btnSound, {
    icon: soundEnabled ? '♫' : '♪',
    label: soundEnabled ? 'Silenciar' : 'Som',
    title: soundEnabled ? 'Desativar ambiente sonoro' : 'Ativar ambiente sonoro',
    pressed: soundEnabled
  });
}

function applyPreferences() {
  document.body.classList.toggle('readable-font', preferences.readable);
  document.body.classList.toggle('high-contrast', preferences.contrast);
  document.body.classList.toggle('reduce-motion', preferences.reduceMotion);
  document.body.classList.remove('font-small', 'font-medium', 'font-large');
  document.body.classList.add(`font-${preferences.fontSize}`);

  ui.settingReadable.checked = preferences.readable;
  ui.settingContrast.checked = preferences.contrast;
  ui.settingMotion.checked = preferences.reduceMotion;
  ui.fontSizeControl.querySelectorAll('[data-font-size]').forEach((button) => {
    const active = button.dataset.fontSize === preferences.fontSize;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function savePreferences() {
  safeWrite(SETTINGS_KEY, preferences);
  applyPreferences();
}

function setupPreferences() {
  const saved = safeRead(SETTINGS_KEY);
  if (saved) preferences = { ...preferences, ...saved };
  if (!['small', 'medium', 'large'].includes(preferences.fontSize)) preferences.fontSize = 'medium';
  applyPreferences();

  ui.fontSizeControl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-font-size]');
    if (!button) return;
    preferences.fontSize = button.dataset.fontSize;
    savePreferences();
  });
  ui.settingReadable.addEventListener('change', () => {
    preferences.readable = ui.settingReadable.checked;
    savePreferences();
  });
  ui.settingContrast.addEventListener('change', () => {
    preferences.contrast = ui.settingContrast.checked;
    savePreferences();
  });
  ui.settingMotion.addEventListener('change', () => {
    preferences.reduceMotion = ui.settingMotion.checked;
    savePreferences();
  });
}

function setupCredits() {
  if (!ui.credits || !credits.links) return;
  Object.entries(credits.links).forEach(([label, href]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    ui.credits.appendChild(link);
  });
}

function setupControls() {
  ui.btnNarrate.addEventListener('click', toggleNarration);
  ui.btnSound.addEventListener('click', toggleSound);
  ui.btnSettings.addEventListener('click', () => openDialog(ui.settingsDialog));
  ui.btnSidebar.addEventListener('click', () => {
    if (document.body.classList.contains('sidebar-open')) closeSidebar();
    else openSidebar();
  });
  ui.btnCloseSidebar.addEventListener('click', closeSidebar);
  ui.scrim.addEventListener('click', closeSidebar);
  ui.btnUndo.addEventListener('click', undoLastChoice);
  ui.btnRestart.addEventListener('click', () => openDialog(ui.restartDialog));
  ui.btnConfirmRestart.addEventListener('click', (event) => {
    event.preventDefault();
    closeDialog(ui.restartDialog);
    startNewGame({ announce: true });
  });

  ui.btnResume.addEventListener('click', (event) => {
    event.preventDefault();
    closeDialog(ui.resumeDialog);
    if (saveCandidate) restoreGame(saveCandidate);
  });
  ui.btnNewGame.addEventListener('click', (event) => {
    event.preventDefault();
    closeDialog(ui.resumeDialog);
    startNewGame({ announce: true });
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
    if (document.querySelector('dialog[open]')) return;

    if (/^[1-9]$/.test(event.key)) {
      const choice = ui.options.querySelector(`[data-choice-index="${event.key}"]:not(:disabled)`);
      if (choice) {
        event.preventDefault();
        choice.click();
      }
    } else if (event.key.toLowerCase() === 'i') {
      event.preventDefault();
      if (document.body.classList.contains('sidebar-open')) closeSidebar();
      else openSidebar();
    } else if (event.key === 'Escape') {
      closeSidebar();
    }
  });

  window.addEventListener('beforeunload', () => {
    if (currentNodeId > 0 || decisionCount > 0) persistGame();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && (currentNodeId > 0 || decisionCount > 0)) persistGame();
  });
}

function describeSave(save) {
  try {
    const decisions = save.decisionCount || 0;
    const date = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(save.savedAt));
    return `${decisions} ${decisions === 1 ? 'decisão tomada' : 'decisões tomadas'} · salvo em ${date}.`;
  } catch {
    const decisions = save.decisionCount || 0;
    return `${decisions} ${decisions === 1 ? 'decisão tomada' : 'decisões tomadas'} nesta jornada.`;
  }
}

function validateCanonicalStory() {
  const ids = new Set(textNodes.map((node) => node.id));
  const invalidLinks = textNodes.flatMap((node) => node.options || []).filter((option) => option.nextText >= 0 && !ids.has(option.nextText));
  if (invalidLinks.length) console.error('A aventura contém caminhos sem destino.', invalidLinks);
}

function initialize() {
  validateCanonicalStory();
  setupPreferences();
  setupCredits();
  setupControls();
  loadVoices();
  if (window.speechSynthesis && 'onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  document.title = `${credits.title} | Crônicas RPG`;
  showTextNode(0, { persist: false, focus: false });
  saveCandidate = safeRead(SAVE_KEY);
  if (validSave(saveCandidate) && saveCandidate.currentNodeId > 0) {
    ui.resumeDescription.textContent = describeSave(saveCandidate);
    window.setTimeout(() => openDialog(ui.resumeDialog), 120);
  } else {
    saveCandidate = null;
    updateSaveStatus('Pronto para começar');
  }
}

initialize();
