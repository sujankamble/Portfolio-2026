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
    chapters.forEach((chapter, i) => {
      if (chapter.dataset.accordion) return;
      chapter.dataset.accordion = '1';

      const label = chapter.querySelector('.chapter-label');
      const title = chapter.querySelector('.chapter-title');
      if (!label || !title) return;

      // Build clickable header
      const header = document.createElement('div');
      header.className = 'ch-accordion-header';
      header.appendChild(label.cloneNode(true));
      header.appendChild(title.cloneNode(true));
      const chevron = document.createElement('span');
      chevron.className = 'ch-chevron';
      chevron.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
      header.appendChild(chevron);

      // Wrap remaining content in collapsible body
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

      // First chapter open by default
      if (i === 0) {
        chapter.classList.add('ch-open');
        chapter.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => el.classList.add('visible'));
        chapter.querySelectorAll('.stagger-child').forEach(el => el.classList.add('visible'));
      }

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
