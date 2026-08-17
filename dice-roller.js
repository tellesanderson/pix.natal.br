/**
 * Crônicas RPG - Rolador de Dados Virtual Universal & Utilidades
 */

class RPGDiceRoller {
  constructor() {
    this.history = [];
    this.audioCtx = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.injectStyles();
    this.injectDOM();
    this.attachEvents();
    this.checkLastPlayed();
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playDiceSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        const freq = 200 + Math.random() * 400;
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        osc.frequency.exponentialRampToValueAtTime(80, now + i * 0.04 + 0.06);
        
        gain.gain.setValueAtTime(0.08, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.06);
      }
    } catch (e) {}
  }

  injectStyles() {
    if (document.getElementById('rpg-dice-roller-styles')) return;
    const style = document.createElement('style');
    style.id = 'rpg-dice-roller-styles';
    style.textContent = `
      .dice-floating-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9990;
        background: linear-gradient(135deg, #1b1722, #0d0a11);
        border: 2px solid #ceb15b;
        color: #ceb15b;
        padding: 12px 18px;
        border-radius: 50px;
        font-family: 'Cinzel', serif, Georgia, sans-serif;
        font-size: 0.95rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(206, 177, 91, 0.25);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .dice-floating-btn:hover {
        transform: translateY(-4px) scale(1.05);
        border-color: #fff;
        color: #fff;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.8), 0 0 25px rgba(206, 177, 91, 0.5);
      }
      .dice-modal-overlay {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(8px);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .dice-modal-overlay.active {
        opacity: 1;
        pointer-events: auto;
      }
      .dice-modal {
        background: linear-gradient(145deg, #18151f 0%, #0c0a10 100%);
        border: 1px solid rgba(206, 177, 91, 0.4);
        border-radius: 16px;
        width: 90%;
        max-width: 480px;
        padding: 24px;
        color: #eaeaea;
        font-family: 'Inter', system-ui, sans-serif;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(206, 177, 91, 0.15);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .dice-modal-overlay.active .dice-modal {
        transform: scale(1);
      }
      .dice-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 14px;
        margin-bottom: 20px;
      }
      .dice-modal-header h3 {
        font-family: 'Cinzel', serif;
        font-size: 1.3rem;
        color: #ceb15b;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dice-modal-close {
        background: none;
        border: none;
        color: #8a8a99;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s;
      }
      .dice-modal-close:hover {
        color: #fff;
        background: rgba(255,255,255,0.1);
      }
      .dice-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 20px;
      }
      .dice-btn {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(206, 177, 91, 0.25);
        color: #ceb15b;
        padding: 12px 6px;
        border-radius: 8px;
        font-family: 'Cinzel', serif;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .dice-btn:hover {
        background: rgba(206, 177, 91, 0.15);
        border-color: #ceb15b;
        transform: translateY(-2px);
        color: #fff;
      }
      .dice-btn:active {
        transform: scale(0.95);
      }
      .dice-controls {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
      }
      .dice-controls label {
        font-size: 0.85rem;
        color: #8a8a99;
      }
      .dice-controls input {
        width: 60px;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #fff;
        padding: 6px 8px;
        border-radius: 6px;
        font-size: 0.95rem;
        text-align: center;
      }
      .dice-result-area {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
      }
      .dice-result-number {
        font-size: 2.8rem;
        font-family: 'Cinzel', serif;
        font-weight: 800;
        color: #ceb15b;
        line-height: 1;
        margin-bottom: 4px;
        text-shadow: 0 0 20px rgba(206, 177, 91, 0.4);
      }
      .dice-result-number.crit-success {
        color: #4ade80;
        text-shadow: 0 0 25px rgba(74, 222, 128, 0.6);
        animation: pulseCrit 0.5s ease-in-out;
      }
      .dice-result-number.crit-fail {
        color: #f87171;
        text-shadow: 0 0 25px rgba(248, 113, 113, 0.6);
      }
      .dice-result-details {
        font-size: 0.85rem;
        color: #8a8a99;
      }
      .dice-history {
        max-height: 90px;
        overflow-y: auto;
        font-size: 0.8rem;
        color: #71717a;
        text-align: left;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding-top: 10px;
      }
      .dice-history-item {
        padding: 3px 0;
        display: flex;
        justify-content: space-between;
      }
      @keyframes pulseCrit {
        0% { transform: scale(0.8); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  injectDOM() {
    if (document.getElementById('rpg-dice-widget')) return;

    // Floating Button
    const btn = document.createElement('button');
    btn.id = 'rpg-dice-widget';
    btn.className = 'dice-floating-btn';
    btn.setAttribute('aria-label', 'Abrir Rolador de Dados RPG');
    btn.innerHTML = '🎲 <span>Rolar Dados</span>';
    document.body.appendChild(btn);

    // Modal
    const overlay = document.createElement('div');
    overlay.className = 'dice-modal-overlay';
    overlay.id = 'dice-modal-overlay';
    overlay.innerHTML = `
      <div class="dice-modal" role="dialog" aria-modal="true" aria-labelledby="dice-title">
        <div class="dice-modal-header">
          <h3 id="dice-title">🎲 Rolador de Dados RPG</h3>
          <button class="dice-modal-close" id="dice-modal-close" aria-label="Fechar">&times;</button>
        </div>
        <div class="dice-grid">
          <button class="dice-btn" data-sides="4">D4</button>
          <button class="dice-btn" data-sides="6">D6</button>
          <button class="dice-btn" data-sides="8">D8</button>
          <button class="dice-btn" data-sides="10">D10</button>
          <button class="dice-btn" data-sides="12">D12</button>
          <button class="dice-btn" data-sides="20">D20</button>
          <button class="dice-btn" data-sides="100">D100</button>
          <button class="dice-btn" data-sides="custom">2D6</button>
        </div>
        <div class="dice-controls">
          <label for="dice-mod">Modificador (+/-):</label>
          <input type="number" id="dice-mod" value="0" min="-50" max="50">
          <span style="font-size: 0.75rem; color: #71717a; margin-left: auto;">Pressione ou clique</span>
        </div>
        <div class="dice-result-area">
          <div class="dice-result-number" id="dice-res-num">--</div>
          <div class="dice-result-details" id="dice-res-det">Escolha um dado acima</div>
        </div>
        <div class="dice-history" id="dice-history-list">
          <em>Histórico de rolagens aparecerá aqui...</em>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  attachEvents() {
    const btn = document.getElementById('rpg-dice-widget');
    const overlay = document.getElementById('dice-modal-overlay');
    const closeBtn = document.getElementById('dice-modal-close');

    if (btn) btn.addEventListener('click', () => this.toggleModal());
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleModal(false));
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.toggleModal(false);
      });
    }

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.toggleModal(false);
    });

    // Dice click handlers
    const diceBtns = document.querySelectorAll('.dice-btn');
    diceBtns.forEach(dBtn => {
      dBtn.addEventListener('click', () => {
        const sides = dBtn.dataset.sides;
        const mod = parseInt(document.getElementById('dice-mod').value, 10) || 0;
        this.roll(sides, mod);
      });
    });
  }

  toggleModal(open = !this.isOpen) {
    this.isOpen = open;
    const overlay = document.getElementById('dice-modal-overlay');
    if (overlay) {
      if (this.isOpen) {
        overlay.classList.add('active');
        this.getAudioContext();
      } else {
        overlay.classList.remove('active');
      }
    }
  }

  roll(type, mod = 0) {
    this.playDiceSound();
    let rollTotal = 0;
    let rollDetails = '';
    let isD20 = false;
    let rawResult = 0;

    if (type === 'custom') {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      rawResult = d1 + d2;
      rollTotal = rawResult + mod;
      rollDetails = `2D6 [${d1}, ${d2}] ${mod !== 0 ? (mod > 0 ? '+ ' + mod : '- ' + Math.abs(mod)) : ''} = ${rollTotal}`;
    } else {
      const sides = parseInt(type, 10);
      rawResult = Math.floor(Math.random() * sides) + 1;
      rollTotal = rawResult + mod;
      isD20 = sides === 20;
      rollDetails = `1D${sides} [${rawResult}] ${mod !== 0 ? (mod > 0 ? '+ ' + mod : '- ' + Math.abs(mod)) : ''} = ${rollTotal}`;
    }

    const resNum = document.getElementById('dice-res-num');
    const resDet = document.getElementById('dice-res-det');

    if (resNum && resDet) {
      resNum.className = 'dice-result-number';
      if (isD20 && rawResult === 20) {
        resNum.classList.add('crit-success');
        rollDetails += ' (Sucesso Crítico!)';
      } else if (isD20 && rawResult === 1) {
        resNum.classList.add('crit-fail');
        rollDetails += ' (Falha Crítica!)';
      }
      resNum.innerText = rollTotal;
      resDet.innerText = rollDetails;
    }

    // Add to history
    this.addHistory(rollDetails);
  }

  addHistory(text) {
    const list = document.getElementById('dice-history-list');
    if (!list) return;
    this.history.unshift({ text, time: new Date().toLocaleTimeString() });
    if (this.history.length > 8) this.history.pop();

    list.innerHTML = this.history.map(item => `
      <div class="dice-history-item">
        <span>${item.text}</span>
        <span>${item.time}</span>
      </div>
    `).join('');
  }

  checkLastPlayed() {
    // Record current location as last played if in a valid adventure subfolder
    const path = window.location.pathname;
    const adventures = [
      'jovem-guerreiro',
      'nascido-das-trevas',
      'sem-saida',
      'assalto-ao-mestre-arsenal',
      'eu-o-monstro',
      'heranca-maldita',
      'coragem-metalica',
      'o-segredo-do-mosteiro'
    ];
    
    for (const slug of adventures) {
      if (path.includes(`/${slug}`)) {
        localStorage.setItem('cronicas_last_adventure', slug);
        localStorage.setItem('cronicas_last_time', new Date().toISOString());
        break;
      }
    }
  }
}

// Auto instantiate on DOM load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RPGDiceRoller());
  } else {
    new RPGDiceRoller();
  }
}
