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
        if (entry.isIntersecting) { if (!userPaused) v.play().catch(() => {}); }
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

// Hero: escolhe o vídeo pela largura, só toca se visível e sem "reduzir movimento".
(() => {
  const v = document.querySelector('.hero__video'), btn = document.getElementById('hero-pause');
  if (!v) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = matchMedia('(min-width: 900px)').matches;
  const src = wide ? v.dataset.wide : v.dataset.tall;
  if (!wide) v.poster = 'assets/video/hero-poster-tall.webp';
  v.addEventListener('loadeddata', () => { v.classList.add('is-ready'); if (btn) btn.classList.add('is-on'); }, { once: true });
  v.addEventListener('error', () => v.removeAttribute('src'), { once: true });
  v.src = src;
  if (btn) {
    const sync = () => { btn.classList.toggle('is-paused', v.paused); btn.setAttribute('aria-label', v.paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'); };
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    btn.addEventListener('click', () => { if (v.paused) { userPaused = false; v.play().catch(() => {}); } else { userPaused = true; v.pause(); } });
  }
  let userPaused = reduce;
  if (!reduce) v.play().catch(() => {});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (!userPaused) v.play().catch(() => {}); } else v.pause(); }, { threshold: 0.1 }).observe(v.parentElement);
  }
})();

// Botão flutuante: só aparece depois que o CTA do hero sai de vista (evita CTA duplicado).
(() => {
  const f = document.querySelector('.float-wa'), t = document.querySelector('.hero .actions');
  if (!f || !t || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  new IntersectionObserver(([e]) => f.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(t);
})();
