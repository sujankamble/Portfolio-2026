import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], raf;
    let mouseX, mouseY;

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; mouseX = W / 2; mouseY = H / 2; }
    resize();

    function initP() {
      const isLight = document.body.classList.contains('light-mode');
      particles = [];
      const count = Math.floor(W * H / 9000);
      for (let i = 0; i < count; i++) particles.push({
        x: Math.random() * W, y: Math.random() * H,
        r: isLight ? Math.random() * 2.4 + 0.8 : Math.random() * 2.0 + 0.4,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        alpha: isLight ? Math.random() * 0.5 + 0.45 : Math.random() * 0.55 + 0.25,
        color: isLight ? 'rgba(42,109,255,' : (Math.random() > 0.55 ? 'rgba(255,120,55,' : Math.random() > 0.4 ? 'rgba(190,70,240,' : Math.random() > 0.5 ? 'rgba(100,210,255,' : 'rgba(240,240,255,'),
      });
    }
    initP();

    const onMouseMove = e => { const r = canvas.getBoundingClientRect(); mouseX = e.clientX - r.left; mouseY = e.clientY - r.top; };
    canvas.addEventListener('mousemove', onMouseMove);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        const dx = p.x - mouseX, dy = p.y - mouseY, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.x += dx / dist * 0.4; p.y += dy / dist * 0.4; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')'; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(255,107,53,${0.06 * (1 - d / 80)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => { resize(); initP(); };
    const onTheme = () => initP();
    window.addEventListener('resize', onResize);
    window.addEventListener('themechange', onTheme);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('themechange', onTheme);
    };
  }, []);

  // Word shuffle
  useEffect(() => {
    const container = document.getElementById('wordShuffle');
    if (!container) return;
    const words = ['UX', 'Product', 'Experience', 'Interaction'];
    let idx = 0, busy = false;
    const STAGGER_OUT = 28, STAGGER_IN = 52, OUT_DUR = 180, IN_DUR = 240, GAP = 60, HOLD = 3000;

    function makeChar(ch) {
      const wrap = document.createElement('span'); wrap.className = 'flip-char';
      const inner = document.createElement('span'); inner.className = 'flip-char-inner';
      inner.textContent = ch === ' ' ? ' ' : ch;
      wrap.appendChild(inner); return { wrap, inner };
    }
    function buildWord(word, animateIn) {
      container.innerHTML = '';
      word.split('').forEach((ch, i) => {
        const { wrap, inner } = makeChar(ch); container.appendChild(wrap);
        if (animateIn) { inner.style.opacity = '0'; inner.style.transform = 'rotateX(-90deg) scaleY(.8)'; setTimeout(() => { inner.style.animation = `flipIn ${IN_DUR}ms cubic-bezier(.16,1,.3,1) forwards`; }, i * STAGGER_IN); }
      });
    }
    function flipTo(newWord) {
      if (busy) return; busy = true;
      const inners = Array.from(container.querySelectorAll('.flip-char-inner'));
      inners.forEach((inner, i) => setTimeout(() => { inner.style.animation = 'none'; void inner.offsetWidth; inner.style.animation = `flipOut ${OUT_DUR}ms cubic-bezier(.4,0,1,1) forwards`; }, i * STAGGER_OUT));
      setTimeout(() => { buildWord(newWord, true); setTimeout(() => { busy = false; }, newWord.length * STAGGER_IN + IN_DUR); }, inners.length * STAGGER_OUT + OUT_DUR + GAP);
    }
    buildWord(words[0], true);
    const interval = setInterval(() => { idx = (idx + 1) % words.length; flipTo(words[idx]); }, HOLD);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => { const w = document.getElementById('work'); if (w) w.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <section className="hero">
      <canvas ref={canvasRef} id="heroCanvas"></canvas>
      <div className="hero-glow"></div>
      <div className="hero-arc"></div>
      <div className="hero-arc-2"></div>
      <div className="hero-content hero-center">
        <h1 className="hero-heading hero-heading-center">
          Hey, I'm <img src="/Portfolio-2026/images/Hero_profile.png" alt="Sujan Kamble" className="hero-inline-img" /> Sujan Kamble<br/>
          A <span className="word-shuffle" id="wordShuffle"></span> Designer <img src="/Portfolio-2026/images/Hero_nature1.png" alt="" className="hero-inline-img" /><img src="/Portfolio-2026/images/Hero_nature2.png" alt="" className="hero-inline-img" /><br/>
          turning complex systems into things people <em>understand</em>
        </h1>
        <p className="hero-sub hero-sub-center">
          Research-led design for high-stakes domains: finance, banking, pharma, and insurance.
        </p>
        <div className="lets-talk-ctas hero-ctas">
          <a href="http://linkedin.com/in/sujan-kamble-02393930" target="_blank" rel="noreferrer" className="avail-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href="mailto:sujankamble@gmail.com" className="avail-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
          <span className="avail-cta avail-cta-tooltip" tabIndex="0" aria-label="Mobile: 9890936926">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Mobile
            <span className="avail-cta-tooltip-text">9890936926</span>
          </span>
        </div>
        <button className="hero-scroll-hint" onClick={scrollToWork} aria-label="Scroll to work">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </button>
      </div>
    </section>
  );
}
