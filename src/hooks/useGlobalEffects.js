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

      header.addEventListener('click', () => {
        const isOpen = chapter.classList.toggle('ch-open');
        if (isOpen) {
          setTimeout(() => {
            chapter.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => el.classList.add('visible'));
            chapter.querySelectorAll('.stagger-child').forEach(el => el.classList.add('visible'));
          }, 50);
        }
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
