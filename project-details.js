(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const projects = {
    'digital-saathi': {
      number: '01', category: 'ACCESSIBILITY / WEB PLATFORM', title: 'Digital Saathi',
      strapline: 'Making digital access feel simpler, friendlier and more local.',
      accent: 'visual-blue',
      description: 'A web platform designed around rural digital literacy and accessibility, with vernacular language support and intuitive navigation for government-scheme discovery.',
      role: 'Frontend / Product Builder', year: '2026', status: 'Built',
      stack: ['React', 'Node.js', 'Tailwind CSS', 'REST APIs'],
      features: ['Vernacular-friendly navigation', 'Accessibility-first interface patterns', 'Government-scheme discovery flows', 'Responsive layouts for smaller screens'],
      approach: ['Reduce friction before adding features.', 'Use familiar language and predictable navigation patterns.', 'Keep information dense enough to be useful but simple enough to scan.', 'Design for real-world connectivity and device constraints.'],
      demo: 'https://digital-saathi.vercel.app/', demoLabel: 'Open live demo',
      repo: 'https://github.com/mratunjaypandey', repoLabel: 'View GitHub',
      note: 'The public portfolio highlights this as a rural digital-literacy and accessibility project; the case-study page expands that story without inventing additional product claims.'
    },
    'stg-forensics': {
      number: '02', category: 'CYBERSECURITY / FORENSICS TOOL', title: 'STG.FORENSICS',
      strapline: 'Turning hidden-image analysis into a readable workflow.',
      accent: 'visual-purple',
      description: 'A browser-based steganalysis interface for detecting hidden data in images using LSB analysis, presented through clean, data-focused layouts.',
      role: 'Frontend / UI Implementation', year: '2026', status: 'Live',
      stack: ['Python', 'Flask', 'HTML/CSS', 'LSB Analysis'],
      features: ['Image-focused forensic workflow', 'LSB analysis presentation', 'Data-oriented visual hierarchy', 'Non-expert-friendly result display'],
      approach: ['Make technical output easy to scan.', 'Separate analysis signals from explanatory context.', 'Use a focused workflow rather than a dashboard overloaded with controls.', 'Keep the visual language aligned with the cybersecurity use case.'],
      demo: 'https://steganalysis.vercel.app/', demoLabel: 'Open live demo',
      repo: 'https://github.com/mratunjaypandey', repoLabel: 'View GitHub',
      note: 'The resume describes the core capability as hidden-data detection in images using LSB analysis.'
    },
    'recoverai': {
      number: '03', category: 'AI / PAYMENTS / BUILDATHON', title: 'RecoverAI',
      strapline: 'Exploring bounded AI workflows for failed-payment recovery.',
      accent: 'visual-orange',
      description: 'An autonomous revenue-recovery concept created for a Razorpay AI Buildathon, combining ML scoring, policy guardrails and recovery workflows.',
      role: 'Hackathon Builder', year: '2026', status: 'Buildathon',
      stack: ['Python', 'FastAPI', 'React', 'ML'],
      features: ['Failure-to-recovery workflow thinking', 'ML-informed prioritisation', 'Policy-aware recovery actions', 'Clear audit-oriented UX direction'],
      approach: ['Keep automated actions bounded by explicit policy.', 'Separate prediction from execution.', 'Show why a recommendation was made, not only what it suggests.', 'Optimise the product flow for evaluator and operator clarity.'],
      demo: null, demoLabel: 'Demo link not published',
      repo: 'https://github.com/mratunjaypandey', repoLabel: 'View GitHub',
      note: 'The current portfolio presents RecoverAI as a Razorpay AI Buildathon concept. No public demo URL was supplied in the resume, so the case study does not invent one.'
    },
    'portfolio': {
      number: '04', category: 'PERSONAL PRODUCT / PRODUCTION UI', title: 'Mratunjay Pandey Portfolio',
      strapline: 'A portfolio designed to feel like a product, not a document.',
      accent: 'visual-green',
      description: 'A production-grade responsive portfolio showcasing projects, technical skills, achievements, certifications, resume and professional links.',
      role: 'Designer / Developer', year: '2026', status: 'Live',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
      features: ['Responsive navigation and project storytelling', 'Animated interactions and custom cursor', 'Coding-profile and social-link surfaces', 'Recruiter-friendly resume and contact paths'],
      approach: ['Keep motion purposeful and lightweight.', 'Build reusable visual patterns rather than isolated effects.', 'Make the important links available within one or two interactions.', 'Treat performance as part of the design.'],
      demo: 'index.html', demoLabel: 'Open portfolio',
      repo: 'https://github.com/mratunjaypandey', repoLabel: 'View GitHub',
      note: 'This is the portfolio itself, built as a fast static experience and ready for Vercel deployment.'
    }
  };

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project') || 'digital-saathi';
  const project = projects[slug] || projects['digital-saathi'];

  document.title = `${project.title} — Mratunjay Pandey`;

  const hero = $('#projectHero');
  const body = $('#projectBody');

  hero.innerHTML = `
    <div class="details-hero-grid reveal">
      <div>
        <div class="eyebrow"><span class="pulse"></span>${project.category}</div>
        <div class="details-title-row"><span class="details-number">${project.number}</span><h1>${project.title}</h1></div>
        <p class="details-strapline">${project.strapline}</p>
        <p class="details-lead">${project.description}</p>
        <div class="details-actions">
          ${project.demo ? `<a class="btn btn-primary magnetic" href="${project.demo}" target="_blank" rel="noreferrer">${project.demoLabel} <span>↗</span></a>` : `<span class="details-disabled">${project.demoLabel}</span>`}
          <a class="btn btn-ghost magnetic" href="${project.repo}" target="_blank" rel="noreferrer">${project.repoLabel} <span>↗</span></a>
        </div>
      </div>
      <div class="details-art ${project.accent} tilt-card">
        <div class="details-art-grid"></div>
        <div class="details-art-core"><span>${project.number}</span><strong>${project.title}</strong><small>CASE STUDY</small></div>
        <div class="details-art-tag">${project.status}</div>
      </div>
    </div>`;

  body.innerHTML = `
    <div class="details-stats reveal">
      <div><span>ROLE</span><strong>${project.role}</strong></div>
      <div><span>YEAR</span><strong>${project.year}</strong></div>
      <div><span>STATUS</span><strong>${project.status}</strong></div>
    </div>
    <div class="details-columns">
      <section class="details-section reveal">
        <span class="section-kicker">01 / TOOLKIT</span>
        <h2>Tech that shaped the build.</h2>
        <div class="detail-stack">${project.stack.map(item => `<span>${item}</span>`).join('')}</div>
      </section>
      <section class="details-section reveal reveal-delay">
        <span class="section-kicker">02 / HIGHLIGHTS</span>
        <h2>What the experience focuses on.</h2>
        <div class="detail-list">${project.features.map((item, i) => `<div><span>0${i+1}</span><p>${item}</p></div>`).join('')}</div>
      </section>
    </div>
    <section class="details-section details-wide reveal">
      <span class="section-kicker">03 / BUILDING PRINCIPLES</span>
      <h2>How I think about the product.</h2>
      <div class="principles-grid">${project.approach.map(item => `<article class="principle tilt-card"><span>✦</span><p>${item}</p></article>`).join('')}</div>
    </section>
    <section class="details-note reveal">
      <span class="section-kicker">PROJECT NOTE</span>
      <p>${project.note}</p>
    </section>
    <div class="details-footer-cta reveal">
      <a class="text-link magnetic" href="index.html#projects">← Back to all projects</a>
      <a class="text-link magnetic" href="mailto:mratunjay.pandey.dev@gmail.com">Discuss a similar project ↗</a>
    </div>`;

  const progress = $('.scroll-progress');
  let progressPending = false;
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${h > 0 ? Math.min(100, scrollY / h * 100) : 0}%`;
    progressPending = false;
  };
  addEventListener('scroll', () => { if (!progressPending) { progressPending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  updateProgress();

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    const dot = $('.cursor-dot'); const ring = $('.cursor-ring');
    let tx = innerWidth/2, ty = innerHeight/2, dx = tx, dy = ty, rx = tx, ry = ty, raf = 0;
    const render = () => { dx += (tx-dx)*.55; dy += (ty-dy)*.55; rx += (tx-rx)*.16; ry += (ty-ry)*.16; dot.style.transform=`translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`; ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`; raf=requestAnimationFrame(render); };
    addEventListener('pointermove', e => { tx=e.clientX; ty=e.clientY; }, { passive: true }); render();
    document.querySelectorAll('a,button,.tilt-card').forEach(el => { el.addEventListener('mouseenter', ()=>ring.classList.add('is-hover')); el.addEventListener('mouseleave', ()=>ring.classList.remove('is-hover')); });
    addEventListener('pagehide', ()=>cancelAnimationFrame(raf));
    document.querySelectorAll('.magnetic').forEach(el => { el.addEventListener('pointermove', e => { const r=el.getBoundingClientRect(); const x=(e.clientX-(r.left+r.width/2))*.12; const y=(e.clientY-(r.top+r.height/2))*.12; el.style.transform=`translate3d(${x}px,${y}px,0)`; }, {passive:true}); el.addEventListener('pointerleave', ()=>el.style.transform='translate3d(0,0,0)', {passive:true}); });
    document.querySelectorAll('.tilt-card').forEach(card => { let t=0; card.addEventListener('pointermove', e => { cancelAnimationFrame(t); t=requestAnimationFrame(()=>{const r=card.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-.5; const py=(e.clientY-r.top)/r.height-.5; card.style.transform=`perspective(1000px) rotateX(${(-py*4).toFixed(2)}deg) rotateY(${(px*5).toFixed(2)}deg)`;});}); card.addEventListener('pointerleave', ()=>{cancelAnimationFrame(t); card.style.transform='';}, {passive:true}); });
  }
  $('#year').textContent = new Date().getFullYear();
})();
