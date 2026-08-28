const STYLE_ID = 'cronicas-adventure-save-styles';
const LAST_ADVENTURE_KEY = 'cronicas_last_adventure';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .adventure-resume-dialog {
      width: min(92vw, 520px);
      max-width: 520px;
      padding: 0;
      border: 1px solid rgba(213, 177, 83, .48);
      border-radius: 18px;
      color: #f3ecdc;
      background:
        linear-gradient(145deg, rgba(34, 31, 25, .98), rgba(10, 11, 11, .99));
      box-shadow: 0 28px 90px rgba(0, 0, 0, .72), 0 0 0 1px rgba(255, 255, 255, .03) inset;
      overflow: hidden;
      font-family: Georgia, 'Times New Roman', serif;
    }

    .adventure-resume-dialog::backdrop {
      background: rgba(2, 3, 3, .82);
      backdrop-filter: blur(7px);
    }

    .adventure-resume-dialog[data-fallback='true'] {
      position: fixed;
      inset: 50% auto auto 50%;
      z-index: 2147483647;
      transform: translate(-50%, -50%);
    }

    .adventure-resume-dialog__content {
      position: relative;
      padding: clamp(26px, 5vw, 42px);
    }

    .adventure-resume-dialog__eyebrow {
      margin: 0 0 12px;
      color: #d8b75d;
      font: 700 .72rem/1.2 Arial, sans-serif;
      letter-spacing: .2em;
      text-transform: uppercase;
    }

    .adventure-resume-dialog h2 {
      margin: 0;
      color: #fffaf0;
      font-size: clamp(1.7rem, 5vw, 2.35rem);
      line-height: 1.08;
      text-wrap: balance;
    }

    .adventure-resume-dialog__copy {
      margin: 18px 0 0;
      color: rgba(244, 238, 225, .78);
      font: 400 1rem/1.65 Arial, sans-serif;
    }

    .adventure-resume-dialog__meta {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 18px 0 0;
      color: rgba(216, 183, 93, .9);
      font: 600 .76rem/1.4 Arial, sans-serif;
      letter-spacing: .06em;
      text-transform: uppercase;
    }

    .adventure-resume-dialog__meta::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #d8b75d;
      box-shadow: 0 0 13px rgba(216, 183, 93, .8);
    }

    .adventure-resume-dialog__actions {
      display: grid;
      gap: 10px;
      margin-top: 28px;
    }

    .adventure-resume-dialog__button {
      min-height: 52px;
      padding: 13px 18px;
      border: 1px solid rgba(216, 183, 93, .33);
      border-radius: 9px;
      color: #f4ecd8;
      background: rgba(255, 255, 255, .035);
      cursor: pointer;
      font: 700 .82rem/1.2 Arial, sans-serif;
      letter-spacing: .08em;
      text-transform: uppercase;
      transition: transform .18s ease, border-color .18s ease, background .18s ease;
    }

    .adventure-resume-dialog__button:hover,
    .adventure-resume-dialog__button:focus-visible {
      border-color: rgba(232, 201, 113, .82);
      background: rgba(216, 183, 93, .1);
      outline: none;
      transform: translateY(-1px);
    }

    .adventure-resume-dialog__button--primary {
      border-color: #d8b75d;
      color: #15130e;
      background: linear-gradient(135deg, #ead17e, #bc8c2d);
      box-shadow: 0 10px 30px rgba(188, 140, 45, .2);
    }

    .adventure-resume-dialog__button--primary:hover,
    .adventure-resume-dialog__button--primary:focus-visible {
      color: #0d0c09;
      background: linear-gradient(135deg, #f3dc91, #c99a39);
    }

    .adventure-save-status {
      position: fixed;
      left: max(18px, env(safe-area-inset-left));
      bottom: max(18px, env(safe-area-inset-bottom));
      z-index: 2147483646;
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: calc(100vw - 36px);
      padding: 10px 13px;
      border: 1px solid rgba(216, 183, 93, .35);
      border-radius: 999px;
      color: #eee4ce;
      background: rgba(10, 11, 11, .92);
      box-shadow: 0 12px 35px rgba(0, 0, 0, .45);
      opacity: 0;
      pointer-events: none;
      transform: translateY(9px);
      transition: opacity .22s ease, transform .22s ease;
      font: 600 .75rem/1.2 Arial, sans-serif;
    }

    .adventure-save-status::before {
      content: '✓';
      color: #d8b75d;
      font-weight: 900;
    }

    .adventure-save-status.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (min-width: 540px) {
      .adventure-resume-dialog__actions {
        grid-template-columns: 1.25fr 1fr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .adventure-resume-dialog__button,
      .adventure-save-status {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);
}

function formatSavedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Progresso encontrado neste navegador';

  try {
    return `Salvo em ${new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)}`;
  } catch {
    return 'Progresso encontrado neste navegador';
  }
}

function showSavedStatus() {
  ensureStyles();
  let status = document.querySelector('.adventure-save-status');

  if (!status) {
    status = document.createElement('div');
    status.className = 'adventure-save-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = 'Progresso salvo neste navegador';
    document.body.appendChild(status);
  }

  window.clearTimeout(status.hideTimer);
  requestAnimationFrame(() => status.classList.add('is-visible'));
  status.hideTimer = window.setTimeout(() => {
    status.classList.remove('is-visible');
  }, 2200);
}

function appendTextElement(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

export function createAdventureSave({ slug, title, initialNode }) {
  const storageKey = `cronicas-${slug}-save-v1`;

  function clear() {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn(`Não foi possível apagar o progresso de ${title}.`, error);
    }
  }

  function load(nodes) {
    try {
      const rawSave = localStorage.getItem(storageKey);
      if (!rawSave) return null;

      const saved = JSON.parse(rawSave);
      const nodeExists = Array.isArray(nodes)
        && nodes.some(node => node.id === saved.nodeId);
      const stateIsValid = saved.state
        && typeof saved.state === 'object'
        && !Array.isArray(saved.state);

      if (
        saved.version !== 1
        || saved.slug !== slug
        || saved.nodeId === initialNode
        || !nodeExists
        || !stateIsValid
      ) {
        clear();
        return null;
      }

      return saved;
    } catch (error) {
      console.warn(`O progresso de ${title} estava inválido e foi ignorado.`, error);
      clear();
      return null;
    }
  }

  function save(nodeId, state = {}) {
    if (nodeId === initialNode) return;

    try {
      const safeState = JSON.parse(JSON.stringify(state || {}));
      const payload = {
        version: 1,
        slug,
        nodeId,
        state: safeState,
        savedAt: new Date().toISOString()
      };

      localStorage.setItem(storageKey, JSON.stringify(payload));
      localStorage.setItem(LAST_ADVENTURE_KEY, slug);
      showSavedStatus();
    } catch (error) {
      console.warn(`Não foi possível salvar o progresso de ${title}.`, error);
    }
  }

  function offer(saved, { onResume, onRestart }) {
    ensureStyles();

    const dialog = document.createElement('dialog');
    dialog.className = 'adventure-resume-dialog';
    dialog.setAttribute('aria-labelledby', `${slug}-resume-title`);

    const content = document.createElement('div');
    content.className = 'adventure-resume-dialog__content';
    dialog.appendChild(content);

    appendTextElement(content, 'p', 'adventure-resume-dialog__eyebrow', 'Jornada salva');
    const heading = appendTextElement(content, 'h2', '', 'Continuar de onde parou?');
    heading.id = `${slug}-resume-title`;
    appendTextElement(
      content,
      'p',
      'adventure-resume-dialog__copy',
      `Encontramos seu progresso em “${title}” guardado neste navegador.`
    );
    appendTextElement(
      content,
      'p',
      'adventure-resume-dialog__meta',
      formatSavedAt(saved.savedAt)
    );

    const actions = document.createElement('div');
    actions.className = 'adventure-resume-dialog__actions';
    content.appendChild(actions);

    const resumeButton = appendTextElement(
      actions,
      'button',
      'adventure-resume-dialog__button adventure-resume-dialog__button--primary',
      'Retomar jornada'
    );
    resumeButton.type = 'button';

    const restartButton = appendTextElement(
      actions,
      'button',
      'adventure-resume-dialog__button',
      'Começar de novo'
    );
    restartButton.type = 'button';

    const finish = callback => {
      if (dialog.open && typeof dialog.close === 'function') dialog.close();
      dialog.remove();
      callback();
    };

    resumeButton.addEventListener('click', () => finish(onResume));
    restartButton.addEventListener('click', () => finish(onRestart));
    dialog.addEventListener('cancel', event => event.preventDefault());
    document.body.appendChild(dialog);

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.dataset.fallback = 'true';
      dialog.setAttribute('open', '');
      resumeButton.focus();
    }
  }

  return { clear, load, offer, save, storageKey };
}
