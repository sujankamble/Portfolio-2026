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
    const words = ['experiences', 'clarity', 'systems', 'decisions'];
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
      <div className="hero-content">
        <p className="hero-eyebrow">Lead UX Designer · 13+ years</p>
        <h1 className="hero-heading">
          Turning complex<br/>
          systems into <span className="word-shuffle" id="wordShuffle"></span><br/>
          people <em>understand.</em>
        </h1>
        <p className="hero-sub">
          Research-led design for high-stakes domains: finance, banking, pharma, and insurance. Where clarity isn't optional.
        </p>
        <div className="hero-tagline">
          <div className="hero-tagline-line"></div>
          <div>
            <p><span>13 years</span> of working where the problems are hardest.</p>
            <p><span>Research</span> shapes every decision.</p>
            <p>The <span>user's reality</span> is always the starting point.</p>
          </div>
        </div>
        <button className="hero-scroll-hint" onClick={scrollToWork} aria-label="Scroll to work">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </button>
      </div>
    </section>
  );
}
