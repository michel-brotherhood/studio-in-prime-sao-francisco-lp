/* Feito por Michel Brotherhood */
// Tracking de cliques nos CTAs (GA4 / GTM / Meta Pixel, se presentes).
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-cta]');
  if (!el) return;
  const cta = el.dataset.cta;
  if (typeof window.gtag === 'function') window.gtag('event', 'cta_click', { cta_id: cta });
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'cta_click', cta_id: cta });
  if (typeof window.fbq === 'function' && el.href.includes('wa.me')) window.fbq('track', 'Contact', { cta_id: cta });
});

// Vídeo do dono: registra o primeiro play (GA4 / GTM, se presentes).
document.querySelectorAll('video[data-track]').forEach((v) => {
  v.addEventListener('play', () => {
    if (typeof window.gtag === 'function') window.gtag('event', 'video_play', { video_id: v.dataset.track });
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'video_play', video_id: v.dataset.track });
  }, { once: true });
});

// Vídeos do espaço: tocam só quando visíveis, com botão de pausa.
// Com "reduzir movimento" ativo no sistema, nada toca sozinho.
(() => {
  const reels = document.querySelectorAll('.reel');
  if (!reels.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  reels.forEach((reel) => {
    const v = reel.querySelector('video');
    const btn = reel.querySelector('.reel__btn');
    let userPaused = reduce;
    const sync = () => {
      reel.classList.toggle('is-paused', v.paused);
      btn.setAttribute('aria-label', v.paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
    };
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    btn.addEventListener('click', () => {
      if (v.paused) { userPaused = false; v.play().catch(() => {}); }
      else { userPaused = true; v.pause(); }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused) v.play().catch(() => { if (!v.muted) { v.muted = true; v.play().catch(() => {}); } });
        }
        else v.pause();
      }, { threshold: 0.35 }).observe(reel);
    } else if (!userPaused) {
      v.play().catch(() => {});
    }
    sync();
  });
})();

// Header: fundo sólido ao rolar, link ativo e status de funcionamento.
(() => {
  const bar = document.getElementById('topbar');
  if (bar) {
    const on = () => bar.classList.toggle('is-solid', scrollY > 24);
    addEventListener('scroll', on, { passive: true }); on();
  }
  const links = [...document.querySelectorAll('.nav a')];
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const a = map.get(e.target.id);
      if (a && e.isIntersecting) { links.forEach((l) => l.classList.toggle('is-active', l === a)); }
    }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
  // Horários: seg a sex 6h às 22h; sáb, dom e feriados 9h às 13h (feriados não detectados).
  const st = document.getElementById('status'), tx = document.getElementById('status-txt');
  if (st && tx) {
    const p = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const g = (t) => p.find((x) => x.type === t).value;
    const wk = !/^(sáb|dom)/i.test(g('weekday'));
    const m = (+g('hour') % 24) * 60 + +g('minute');
    const [o, c] = wk ? [360, 1320] : [540, 780];
    const open = m >= o && m < c;
    const hh = (x) => `${Math.floor(x / 60)}h`;
    tx.textContent = open ? `Aberto agora · até ${hh(c)}` : 'Fechado agora · ver horários';
    st.classList.toggle('is-closed', !open);
    st.hidden = false; st.classList.add('is-on');
  }
})();

// Hero: alterna os vídeos (crossfade), só toca se visível e sem "reduzir movimento".
(() => {
  const media = document.querySelector('.hero__media'), btn = document.getElementById('hero-pause');
  const vids = [...document.querySelectorAll('.hero__video')];
  if (!media || vids.length < 2) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = matchMedia('(min-width: 900px)').matches;
  const list = (wide ? media.dataset.wide : media.dataset.tall).split(',');
  if (!wide) vids[0].poster = 'assets/video/hero-poster-tall.webp';
  let cur = vids[0], nxt = vids[1], idx = 0, userPaused = reduce, busy = false, visible = true;
  const SLOT = 7; // segundos por vídeo
  const load = (v, i) => { v.src = list[i % list.length]; v.load(); };
  const sync = () => { if (!btn) return; btn.classList.toggle('is-paused', cur.paused); btn.setAttribute('aria-label', cur.paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'); };
  const advance = () => {
    if (busy || userPaused || !visible || list.length < 2) return;
    busy = true;
    nxt.currentTime = 0;
    nxt.play().then(() => {
      nxt.classList.add('is-ready'); cur.classList.remove('is-ready');
      setTimeout(() => {
        cur.pause(); [cur, nxt] = [nxt, cur]; idx = (idx + 1) % list.length;
        load(nxt, idx + 1); busy = false; sync();
      }, 1300);
    }).catch(() => { busy = false; });
  };
  vids.forEach((v) => {
    v.addEventListener('timeupdate', () => { if (v === cur && v.currentTime >= SLOT) advance(); });
    v.addEventListener('ended', () => { if (v === cur) advance(); });
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
  });
  cur.addEventListener('loadeddata', () => { cur.classList.add('is-ready'); if (btn) btn.classList.add('is-on'); }, { once: true });
  cur.addEventListener('error', () => cur.removeAttribute('src'), { once: true });
  load(cur, 0); load(nxt, 1);
  if (!reduce) cur.play().catch(() => {});
  if (btn) btn.addEventListener('click', () => { if (cur.paused) { userPaused = false; cur.play().catch(() => {}); } else { userPaused = true; cur.pause(); } });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { if (!userPaused) cur.play().catch(() => {}); } else cur.pause(); }, { threshold: 0.1 }).observe(media);
  }
})();

// Menu mobile: tela cheia, bloqueia a rolagem, fecha com Esc, link ou ao passar de 900 px.
(() => {
  const btn = document.getElementById('menu-btn'), menu = document.getElementById('menu');
  if (!btn || !menu) return;
  const root = document.documentElement, bg = document.querySelectorAll('main, footer, .float-wa');
  const set = (open) => {
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    root.classList.toggle('menu-open', open);
    bg.forEach((e) => (open ? e.setAttribute('inert', '') : e.removeAttribute('inert')));
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); menu.querySelector('a').focus({ preventScroll: true }); }
    else { menu.classList.remove('is-open'); setTimeout(() => { if (!root.classList.contains('menu-open')) menu.hidden = true; }, 350); btn.focus({ preventScroll: true }); }
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('menu-open')) set(false); });
  matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches && root.classList.contains('menu-open')) set(false); });
})();

// Botão flutuante: só aparece depois que o CTA do hero sai de vista (evita CTA duplicado).
(() => {
  const f = document.querySelector('.float-wa'), t = document.querySelector('.hero .actions');
  if (!f || !t || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  new IntersectionObserver(([e]) => { const on = !e.isIntersecting && e.boundingClientRect.top < 0; f.classList.toggle('is-on', on); document.documentElement.classList.toggle('cta-on', on); }).observe(t);
})();

// Barra de progresso de rolagem.
(() => {
  const bar = document.getElementById('progress');
  if (!bar) return;
  let tick = false;
  const upd = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
    tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
})();

// Revelação ao rolar: escalonada entre irmãos; as classes saem ao fim para não travar os hovers.
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sel = '.section h2, .head, .dif, .dif__cta, .section .lead, .mod, .plan, .terms, .reel, .services li, .amen li, .hours > div, .exp__card, .dono__video, .map, .unit address, .unit__tel, .cta-final__inner > *';
  const els = [...document.querySelectorAll(sel)].filter((e) => !e.closest('.hero'));
  const seen = new Map();
  els.forEach((e) => {
    const p = e.parentElement, i = seen.get(p) || 0;
    seen.set(p, i + 1);
    e.style.setProperty('--d', Math.min(i, 5) * 90 + 'ms');
    e.classList.add('rv');
  });
  document.documentElement.classList.add('rv-on');
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (!en.isIntersecting) return;
    const e = en.target;
    io.unobserve(e);
    e.classList.add('in');
    setTimeout(() => { e.classList.remove('rv', 'in'); e.style.removeProperty('--d'); }, 1500);
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach((e) => io.observe(e));
})();

// Vídeo do fundador: botão de som (começa mudo).
(() => {
  const b = document.querySelector('.reel__snd');
  if (!b) return;
  const v = b.closest('.reel').querySelector('video');
  // O botão reflete o estado real do vídeo; o som escolhido pelo usuário persiste ao sair e voltar da seção.
  const paint = () => {
    b.setAttribute('aria-pressed', String(!v.muted));
    b.setAttribute('aria-label', v.muted ? 'Ativar som' : 'Desativar som');
    b.classList.toggle('is-on', !v.muted);
  };
  v.addEventListener('volumechange', paint);
  b.addEventListener('click', () => {
    v.muted = !v.muted;
    if (!v.muted) { v.volume = 1; if (v.paused) v.play().catch(() => {}); }
    paint();
  });
})();

// Carrossel de fotos: rolagem com snap, setas, contador, teclado e rotação automática em loop.
(() => {
  const t = document.getElementById('gal-track');
  if (!t) return;
  const prev = document.getElementById('gal-prev'), next = document.getElementById('gal-next'), cnt = document.getElementById('gal-count'), play = document.getElementById('gal-play');
  const items = [...t.children];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduce ? 'auto' : 'smooth';
  const step = () => (items[1] ? items[1].offsetLeft - items[0].offsetLeft : t.clientWidth);
  const atEnd = () => t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
  const idx = () => Math.min(items.length - 1, Math.round(t.scrollLeft / step()));
  const sync = () => { cnt.textContent = `${atEnd() ? items.length : idx() + 1} / ${items.length}`; };
  // Loop: depois da última foto volta à primeira; antes da primeira vai à última.
  const go = (d) => {
    if (d > 0 && atEnd()) t.scrollTo({ left: 0, behavior });
    else if (d < 0 && t.scrollLeft <= 4) t.scrollTo({ left: t.scrollWidth, behavior });
    else t.scrollBy({ left: d * step(), behavior });
  };
  prev.addEventListener('click', () => go(-1)); next.addEventListener('click', () => go(1));
  t.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
  let q = false;
  t.addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(() => { sync(); q = false; }); } }, { passive: true });
  addEventListener('resize', sync); sync();

  // Rotação automática: só com a seção visível, pausa com toque/mouse/foco e tem botão de pausa (WCAG 2.2.2).
  let userOff = reduce, visible = false, hold = false, timer = 0;
  const paintPlay = () => {
    play.classList.toggle('is-paused', userOff);
    play.setAttribute('aria-pressed', String(userOff));
    play.setAttribute('aria-label', userOff ? 'Retomar rotação automática' : 'Pausar rotação automática');
  };
  const tick = () => { clearTimeout(timer); if (userOff || !visible || hold || document.hidden) return; timer = setTimeout(() => { go(1); tick(); }, 3200); };
  play.addEventListener('click', () => { userOff = !userOff; paintPlay(); tick(); });
  const holdOn = () => { hold = true; clearTimeout(timer); };
  const holdOff = () => { hold = false; tick(); };
  t.addEventListener('pointerenter', holdOn); t.addEventListener('pointerleave', holdOff);
  t.addEventListener('touchstart', holdOn, { passive: true });
  t.addEventListener('touchend', () => setTimeout(holdOff, 4000), { passive: true });
  t.addEventListener('focusin', holdOn); t.addEventListener('focusout', holdOff);
  document.addEventListener('visibilitychange', tick);
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; tick(); }, { threshold: 0.4 }).observe(t);
  paintPlay();
})();
