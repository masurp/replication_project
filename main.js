/* main.js — GCRI navigation & shared interactivity */

/* ── Password protection ─────────────────── */
if (!sessionStorage.getItem('gcri-authenticated')) {
  const pwd = prompt('This site is under development. Enter password:');
  if (pwd !== 'EPPM2026') {
    alert('Incorrect password');
    location.reload();
  } else {
    sessionStorage.setItem('gcri-authenticated', 'true');
  }
}

(function () {
  'use strict';

  /* ── Sticky / transparent nav ─────────────────── */
  const nav    = document.getElementById('nav');
  const hero   = document.querySelector('.hero-section'); /* transparent only over light home hero */
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('mobile-menu');

  function syncNav() {
    if (!nav) return;
    if (!hero) { nav.classList.remove('transparent'); nav.classList.add('solid'); return; }
    const past = hero.getBoundingClientRect().bottom <= 0;
    nav.classList.toggle('solid',       past);
    nav.classList.toggle('transparent', !past);
  }

  if (nav) {
    window.addEventListener('scroll', syncNav, { passive: true });
    syncNav();
  }

  /* ── Mobile menu ───────────────────────────────── */
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (nav && !nav.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active nav link ───────────────────────────── */
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === file || (file === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── Tweaks: apply CSS variables from localStorage ── */
  function applyTweaks(t) {
    if (!t) return;
    const r = document.documentElement;
    const palettes = {
      indigo: { primary: '#3d2f72', p2: '#5a3e8a', pale: '#ede9f7', gold: '#b8860b', 'gold-btn': '#c8970e', 'bg-alt': '#f4f1fb' },
      teal:   { primary: '#1a4a4a', p2: '#2a7070', pale: '#e5f2f2', gold: '#b8440b', 'gold-btn': '#d05030', 'bg-alt': '#f0f7f7' },
      navy:   { primary: '#0f2d5e', p2: '#1a5090', pale: '#e5edf8', gold: '#b8860b', 'gold-btn': '#c8970e', 'bg-alt': '#f0f4fa' },
    };
    const fonts = {
      georgia:  "'Georgia', 'Times New Roman', serif",
      playfair: "'Playfair Display', Georgia, serif",
      lora:     "'Lora', Georgia, serif",
    };
    if (t.palette && palettes[t.palette]) {
      const p = palettes[t.palette];
      Object.entries(p).forEach(([k, v]) => r.style.setProperty('--c-' + k, v));
    }
    if (t.headingFont && fonts[t.headingFont]) {
      r.style.setProperty('--f-serif', fonts[t.headingFont]);
      if (t.headingFont !== 'georgia') {
        /* Inject Google Font if needed */
        const id = 'gf-' + t.headingFont;
        if (!document.getElementById(id)) {
          const name = t.headingFont === 'playfair' ? 'Playfair+Display:wght@400;700' : 'Lora:wght@400;700';
          const link  = document.createElement('link');
          link.id   = id;
          link.rel  = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=' + name + '&display=swap';
          document.head.appendChild(link);
        }
      }
    }
  }

  try {
    const saved = JSON.parse(localStorage.getItem('gcri-tweaks') || 'null');
    if (saved) applyTweaks(saved);
  } catch (e) { /* ignore */ }

  window.__gcriApplyTweaks = applyTweaks;

})();
