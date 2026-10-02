(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav
  const menu = $('.mobile-menu');
  const panel = $('.mobile-panel');
  if (menu && panel) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('open', !open);
      panel.setAttribute('aria-hidden', String(open));
    });
    $$('.mobile-panel a').forEach(link => link.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }));
  }

  // Fast, RAF-driven cursor with no mousemove style writes.
  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    let tx = innerWidth / 2, ty = innerHeight / 2;
    let dx = tx, dy = ty, rx = tx, ry = ty;
    let rafId = 0;
    const render = () => {
      dx += (tx - dx) * 0.55;
      dy += (ty - dy) * 0.55;
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      dot.style.transform = `translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(render);
    };
    window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    render();
    const hoverables = $$('a,button,.tilt-card,.filter,input,textarea');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
    window.addEventListener('pagehide', () => cancelAnimationFrame(rafId));
  }

  // Magnetic buttons (lightweight, desktop only)
  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    $$('.magnetic').forEach(el => {
      let current = { x: 0, y: 0 };
      const move = e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.12;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.12;
        current = { x, y };
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
      };
      const reset = () => { el.style.transform = 'translate3d(0,0,0)'; };
      el.addEventListener('pointermove', move, { passive: true });
      el.addEventListener('pointerleave', reset, { passive: true });
    });
  }

  // Subtle 3D tilt, throttled to RAF.
  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    $$('.tilt-card').forEach(card => {
      let raf = 0;
      card.addEventListener('pointermove', e => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(1000px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateZ(0)`;
        });
      });
      card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        card.style.transform = '';
      }, { passive: true });
    });
  }

  // Scroll progress
  const progress = $('.scroll-progress');
  let progressPending = false;
  const updateProgress = () => {
    const top = scrollY;
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${height > 0 ? Math.min(100, (top / height) * 100) : 0}%`;
    progressPending = false;
  };
  window.addEventListener('scroll', () => {
    if (!progressPending) {
      progressPending = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();

  // Reveal on scroll
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  // Animated counters
  const counters = $$('[data-counter]');
  const animateCounter = el => {
    const target = Number(el.dataset.counter || 0);
    const suffix = el.dataset.suffix || '';
    const duration = target > 500 ? 1300 : 900;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const tick = now => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = `${Math.floor(target * ease(p))}${p >= 1 ? suffix : ''}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = '1';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .65 });
  counters.forEach(el => counterObserver.observe(el));

  // Project cards open a dedicated case-study page in a new tab.
  $$('.project-card[data-project]').forEach(card => {
    const openDetails = () => {
      const slug = card.dataset.project;
      const url = `project-details.html?project=${encodeURIComponent(slug)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    card.addEventListener('click', e => {
      if (e.target.closest('a,button,input,textarea,select')) return;
      openDetails();
    });
    card.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a,button,input,textarea,select')) {
        e.preventDefault();
        openDetails();
      }
    });
  });

  // Project filtering
  const filters = $$('.filter');
  const projects = $$('.project-card');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.toggle('is-active', b === btn));
    const wanted = btn.dataset.filter;
    projects.forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      card.classList.toggle('is-hidden', wanted !== 'all' && !tags.includes(wanted));
    });
  }));

  // Contact form: mailto draft, no backend required.
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = `Portfolio enquiry from ${data.get('name')}`;
      const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
      window.location.href = `mailto:mratunjay.pandey.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Year
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
