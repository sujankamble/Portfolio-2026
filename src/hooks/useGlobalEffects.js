import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    const staggerObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.stagger-child').forEach(c => c.classList.add('visible'));
          staggerObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    const observe = () => {
      document.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(r => {
        r.classList.remove('visible'); obs.observe(r);
      });
      document.querySelectorAll('.stagger-wrap').forEach(w => {
        w.querySelectorAll('.stagger-child').forEach(c => c.classList.remove('visible'));
        staggerObs.observe(w);
      });
    };
    observe();
    return () => { obs.disconnect(); staggerObs.disconnect(); };
  }, []);
}

export function useChapterAccordion() {
  useEffect(() => {
    const chapters = document.querySelectorAll('.cs-content .chapter');
    // Collect all chapter-dividers for accent colour lookup
    const dividers = Array.from(document.querySelectorAll('.cs-content .chapter-divider'));

    const PROCESS_LABELS = ['Discovery', 'Define', 'Develop', 'Deliver', 'Reflect'];
    let accordionIndex = 0;
    const accordionChapters = [];

    const revealContents = chapter => {
      chapter.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => el.classList.add('visible'));
      chapter.querySelectorAll('.stagger-child').forEach(el => el.classList.add('visible'));
    };

    // Exclusively open `target` — closes any other open accordion chapter first
    const openChapter = target => {
      accordionChapters.forEach(chapter => {
        if (chapter !== target) chapter.classList.remove('ch-open');
      });
      target.classList.add('ch-open');
      setTimeout(() => revealContents(target), 50);
    };
    const closeChapter = target => target.classList.remove('ch-open');

    chapters.forEach((chapter, i) => {
      // The Brief (index 0) is always visible — not an accordion
      if (i === 0) {
        chapter.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => el.classList.add('visible'));
        chapter.querySelectorAll('.stagger-child').forEach(el => el.classList.add('visible'));
        return;
      }

      if (chapter.dataset.accordion) return;
      chapter.dataset.accordion = '1';

      const label = chapter.querySelector('.chapter-label');
      const title = chapter.querySelector('.chapter-title');
      if (!label || !title) return;

      // Get accent colour from preceding chapter-divider or wrap
      const prevDivider = dividers[i - 1];
      const accent = prevDivider?.style.getPropertyValue('--c')
        || document.querySelector('.cs-project-summary-wrap')?.style.getPropertyValue('--c')
        || '#FF6B35';

      // ── Build header ──
      const header = document.createElement('div');
      header.className = 'ch-accordion-header';

      accordionIndex++;

      // Big decorative number (starts at 01 for first accordion)
      const num = document.createElement('span');
      num.className = 'ch-num';
      num.textContent = String(accordionIndex).padStart(2, '0');

      // Right side container
      const right = document.createElement('div');
      right.className = 'ch-header-right';

      // Row 1: pill + gradient line + chevron
      const row1 = document.createElement('div');
      row1.className = 'ch-header-row1';

      const pill = document.createElement('span');
      pill.className = 'chapter-marker';
      pill.style.setProperty('--c', accent);
      pill.textContent = PROCESS_LABELS[i - 1] || `Stage ${i}`;

      const line = document.createElement('span');
      line.className = 'ch-divider-line';
      line.style.setProperty('--c', accent);

      const chevron = document.createElement('span');
      chevron.className = 'ch-chevron';
      chevron.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

      row1.appendChild(pill);
      row1.appendChild(line);
      row1.appendChild(chevron);

      // Row 2: title + hook inline
      const row2 = document.createElement('div');
      row2.className = 'ch-header-row2';

      const titleEl = title.cloneNode(true);
      titleEl.classList.remove('reveal', 'reveal-left', 'reveal-scale');
      titleEl.classList.add('visible');

      const hookEl = document.createElement('span');
      hookEl.className = 'chapter-hook';
      const hookSrc = label.querySelector('.chapter-hook');
      hookEl.textContent = hookSrc ? hookSrc.textContent : '';

      row2.appendChild(titleEl);
      row2.appendChild(hookEl);

      right.appendChild(row1);
      right.appendChild(row2);
      header.appendChild(num);
      header.appendChild(right);

      // ── Collapsible body ──
      const body = document.createElement('div');
      body.className = 'ch-body';
      const inner = document.createElement('div');
      inner.className = 'ch-body-inner';
      Array.from(chapter.children).forEach(child => {
        if (!child.classList.contains('chapter-label') && !child.classList.contains('chapter-title')) {
          inner.appendChild(child);
        }
      });
      label.remove();
      title.remove();
      body.appendChild(inner);
      chapter.appendChild(header);
      chapter.appendChild(body);

      // All accordions start closed by default — no ch-open added
      accordionChapters.push(chapter);

      // Expose exclusive open/close so other hooks (e.g. the side nav) can
      // drive the same accordion without bypassing the single-open guarantee
      chapter.openAccordion = () => openChapter(chapter);
      chapter.closeAccordion = () => closeChapter(chapter);

      header.addEventListener('click', () => {
        if (chapter.classList.contains('ch-open')) closeChapter(chapter);
        else openChapter(chapter);
      });
    });
  }, []);
}

export function useProjectSummaryTilt() {
  useEffect(() => {
    const wrap = document.querySelector('.cs-project-summary-wrap');
    const card = document.querySelector('.cs-project-summary');
    if (!wrap || !card) return;
    const onMove = e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      const isLight = document.body.classList.contains('light-mode');
      card.style.boxShadow = isLight
        ? `${-x * 8}px ${y * 6}px 24px rgba(0,0,0,.10)`
        : `${-x * 10}px ${y * 8}px 32px rgba(0,0,0,.18), 0 0 0 .5px rgba(255,255,255,.06), ${x * 8}px ${-y * 6}px 20px rgba(255,255,255,.04)`;
    };
    const onLeave = () => {
      card.style.transform = 'rotateY(0) rotateX(0)';
      card.style.boxShadow = 'none';
    };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);
}

export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    };
    document.addEventListener('mousemove', onMove);
    let raf;
    const tick = () => {
      rx += (mx - rx - 15) * 0.1; ry += (my - ry - 15) * 0.1;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const addHover = () => {
      document.querySelectorAll('a,button,.card,.card-flare-wrap,.filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
      });
    };
    addHover();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
}

export function useCaseSideNav() {
  useEffect(() => {
    // Only run on case study pages
    if (!document.querySelector('.cs-content')) return;

    // ── SVG icons ──
    const ICONS = [
      // The Brief — clipboard
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>`,
      // Discovery — search
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      // Define — target
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      // Develop — tool
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      // Deliver — flag
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
      // Reflect — star
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    ];
    const LABELS = ['The Brief', 'Discovery', 'Define', 'Develop', 'Deliver', 'Reflect'];

    // ── Build sidebar ──
    const nav = document.createElement('nav');
    nav.className = 'cs-sidenav';
    nav.setAttribute('aria-label', 'Page sections');

    const chapters = Array.from(document.querySelectorAll('.cs-content .chapter'));
    const items = [];

    chapters.forEach((chapter, i) => {
      const item = document.createElement('a');
      item.className = 'cs-sidenav-item';
      item.href = `#${chapter.id}`;
      item.innerHTML = `<span class="cs-sidenav-icon">${ICONS[i] || ICONS[ICONS.length - 1]}</span><span class="cs-sidenav-label">${LABELS[i] || `Section ${i + 1}`}</span>`;
      item.addEventListener('click', e => {
        e.preventDefault();
        if (i > 0 && !chapter.classList.contains('ch-open')) {
          chapter.openAccordion?.();
          // Wait for the collapse/expand grid-template-rows transition (.45s,
          // global.css ~994) to finish so any chapter above that's closing has
          // fully settled — otherwise its shrinking height shifts the target
          // chapter upward mid-scroll and the landing point drifts off the header.
          setTimeout(() => chapter.scrollIntoView({ behavior: 'smooth', block: 'start' }), 480);
        } else {
          chapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      nav.appendChild(item);
      items.push({ chapter, item });
    });

    document.body.appendChild(nav);

    // ── Show/hide after hero ──
    const hero = document.querySelector('.cs-hero');
    let heroObs;
    if (hero) {
      heroObs = new IntersectionObserver(([entry]) => {
        nav.classList.toggle('cs-sidenav--visible', !entry.isIntersecting);
      }, { threshold: 0 });
      heroObs.observe(hero);
    }

    // ── Active section + progress ──
    // A ratio-threshold IntersectionObserver can't work here: chapter heights
    // range from ~120px (collapsed accordions) to 1600px+ ("The Brief", always
    // expanded), so no single threshold is ever crossed by every chapter.
    // Instead, find the last chapter whose top has crossed a fixed reference
    // line in the viewport — the standard scrollspy approach, robust to any
    // section height.
    const REFERENCE_Y_FRACTION = 0.3;
    const lastIdx = items.length - 1;
    let activeIdx = -1;
    let terminalSignature = '';
    let reachedBottom = false;

    function recomputeActive() {
      const referenceY = window.innerHeight * REFERENCE_Y_FRACTION;
      let idx = 0;
      for (let j = 0; j < items.length; j++) {
        if (items[j].chapter.getBoundingClientRect().top <= referenceY) idx = j;
        else break;
      }

      // ── Terminal "completed" state ──
      // Once the user has scrolled to the page bottom (pagination footer visible),
      // unconditionally mark the last section as active and everything before it
      // as visited — regardless of the scrollspy-computed idx (trailing collapsed
      // chapters may not have crossed the reference line yet) and regardless of
      // whether the last chapter's accordion is open or closed.
      if (reachedBottom) {
        if (terminalSignature === 'terminal') return;
        terminalSignature = 'terminal';
        activeIdx = lastIdx;
        items.forEach(({ item }, j) => {
          item.classList.toggle('active', j === lastIdx);
          item.classList.toggle('visited', j < lastIdx);
        });
        return;
      }

      terminalSignature = '';
      if (idx === activeIdx) return;
      activeIdx = idx;
      items.forEach(({ item }, j) => {
        item.classList.toggle('active', j === idx);
        item.classList.toggle('visited', j < idx);
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { recomputeActive(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── "Reached the bottom" detection ──
    // Observe the pagination/footer element so the terminal state engages as
    // soon as the user scrolls to the end of the case study (bidirectional —
    // scrolling back up un-sets it so normal scrollspy behavior resumes).
    const pagination = document.querySelector('.cs-pagination');
    let paginationObs;
    if (pagination) {
      paginationObs = new IntersectionObserver(([entry]) => {
        reachedBottom = entry.isIntersecting;
        recomputeActive();
      }, { threshold: 0 });
      paginationObs.observe(pagination);
    }

    // ── React to accordion open/close immediately ──
    // Covers entry paths that don't produce a meaningful scroll delta (direct
    // nav-item clicks, opening an accordion straight away, deep links, etc.)
    // so active/visited always reflects true position regardless of how the
    // user got there — including detecting "last chapter closed after being
    // opened" for the terminal state above.
    const accordionObs = new MutationObserver(muts => {
      if (muts.some(m => m.attributeName === 'class')) recomputeActive();
    });
    items.forEach(({ chapter }) => {
      accordionObs.observe(chapter, { attributes: true, attributeFilter: ['class'] });
    });

    recomputeActive();

    return () => {
      nav.remove();
      heroObs?.disconnect();
      paginationObs?.disconnect();
      accordionObs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
