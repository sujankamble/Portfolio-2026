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
