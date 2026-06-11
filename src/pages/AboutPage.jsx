import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useGlobalEffects.js';

const ABOUT_HTML = `
  <div class="apaper-board">

    <!-- HERO SHEET -->
    <div class="apaper-sheet apaper-hero reveal">
      <span class="apaper-tape apaper-tape-tl" aria-hidden="true"></span>
      <span class="apaper-tape apaper-tape-tr" aria-hidden="true"></span>
      <div class="apaper-hero-left">
        <p class="apaper-hand-label">About me
          <svg class="apaper-doodle-line" width="120" height="10" viewBox="0 0 120 10" aria-hidden="true"><path d="M2 6 C 30 2, 60 9, 118 4" fill="none" stroke="#1d1a16" stroke-width="2" stroke-linecap="round"/></svg>
        </p>
        <h1 class="apaper-name">Sujan Kamble</h1>
        <p class="apaper-bio">Hi, I’m a <strong>UX designer with 13+ years of experience</strong> based in Pune, doing something I love, turning complex systems into clear, human experiences. I’ve spent over a decade in high-stakes worlds like enterprise finance, banking, places where a confusing button doesn't just cause a sigh, it causes an operational crisis.</p>
        <p class="apaper-bio">I thrive in the messy grey areas of design, bringing rigour to research and deep empathy to the people using the final product. At the end of the day, my philosophy is simple: <strong>figure out what a human actually needs to get done, and get rid of the roadblocks, whatever is blocking their way.</strong></p>
        <div class="apaper-avail">
          <span class="apaper-avail-dot" aria-hidden="true"></span>
          <span>Available for full-time roles &nbsp;·&nbsp; Open to remote &nbsp;·&nbsp; Pune, India</span>
        </div>
      </div>
      <div class="apaper-hero-right">
        <div class="apaper-polaroid apaper-polaroid-profile">
          <svg class="apaper-clip" width="26" height="52" viewBox="0 0 26 52" aria-hidden="true"><path d="M8 14 v26 a5 5 0 0 0 10 0 V10 a8 8 0 0 0 -16 0 v32" fill="none" stroke="#8a8378" stroke-width="2.4" stroke-linecap="round"/></svg>
          <img src="/Portfolio-2026/images/Profile picture 2.jpeg" alt="Sujan Kamble" />
          <span class="apaper-polaroid-caption">Sujan · Pune</span>
        </div>
      </div>
    </div>

    <!-- STATS NOTES -->
    <div class="apaper-stats stagger-wrap">
      <div class="apaper-note stagger-child">
        <div class="apaper-note-num">13<span>+</span></div>
        <div class="apaper-note-label">Years in UX design</div>
      </div>
      <div class="apaper-note stagger-child">
        <div class="apaper-note-num">5</div>
        <div class="apaper-note-label">Case studies across 4 engagements</div>
      </div>
      <div class="apaper-note stagger-child">
        <div class="apaper-note-num">6</div>
        <div class="apaper-note-label">Industries designed for</div>
      </div>
      <div class="apaper-note stagger-child">
        <div class="apaper-note-num">8</div>
        <div class="apaper-note-label">Max team size collaborated with</div>
      </div>
    </div>

    <!-- SKILLS SHEET -->
    <div class="apaper-sheet apaper-tilt-r reveal">
      <span class="apaper-tape apaper-tape-tc" aria-hidden="true"></span>
      <p class="apaper-hand-label">What I do</p>
      <div class="apaper-cards">
        <div class="apaper-index-card">
          <h3 class="apaper-card-title">Research &amp; Strategy</h3>
          <p class="apaper-card-desc">Stakeholder interviews, heuristic evaluations, competitor analysis, and user journey mapping. Turning ambiguous briefs into directions grounded in evidence not assumption.</p>
        </div>
        <div class="apaper-index-card">
          <h3 class="apaper-card-title">Product &amp; App Design</h3>
          <p class="apaper-card-desc">End-to-end product design across web and mobile from information architecture and wireframes through to high-fidelity prototypes and annotated developer handoff.</p>
        </div>
        <div class="apaper-index-card">
          <h3 class="apaper-card-title">Design Systems &amp; Handoff</h3>
          <p class="apaper-card-desc">Building and evolving design systems that scale. UI guidelines, component libraries, accessibility standards, and annotation frameworks that outlast any individual designer's involvement.</p>
        </div>
      </div>
    </div>

    <!-- TOOLS SHEET -->
    <div class="apaper-sheet apaper-tilt-l reveal">
      <span class="apaper-tape apaper-tape-tc" aria-hidden="true"></span>
      <p class="apaper-hand-label">Tools I play with</p>
      <div class="apaper-tools">
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/figma/3c372f" alt="" loading="lazy" />Figma</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/figma/3c372f" alt="" loading="lazy" />FigJam</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/miro/3c372f" alt="" loading="lazy" />Miro</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/sketch/3c372f" alt="" loading="lazy" />Sketch</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/zeplin/3c372f" alt="" loading="lazy" />Zeplin</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/jira/3c372f" alt="" loading="lazy" />Jira</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/confluence/3c372f" alt="" loading="lazy" />Confluence</span>
        <span class="apaper-tool-chip"><img src="https://cdn.simpleicons.org/invision/3c372f" alt="" loading="lazy" />InVision</span>
      </div>
      <p class="apaper-hand-label apaper-industries-label">Industries I've designed for</p>
      <div class="apaper-industries">
        <span class="apaper-ind-stamp">Finance &amp; Audit</span>
        <span class="apaper-ind-stamp">Retail Banking</span>
        <span class="apaper-ind-stamp">Pharma Manufacturing</span>
        <span class="apaper-ind-stamp">Insurance</span>
        <span class="apaper-ind-stamp">Healthcare</span>
        <span class="apaper-ind-stamp">Retail</span>
      </div>
    </div>

    <!-- BEYOND WORK SHEET -->
    <div class="apaper-sheet apaper-tilt-r reveal">
      <span class="apaper-tape apaper-tape-tl" aria-hidden="true"></span>
      <span class="apaper-tape apaper-tape-tr" aria-hidden="true"></span>
      <p class="apaper-hand-label">When I'm not designing...</p>
      <div class="apaper-hobbies">
        <div class="apaper-hobby">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3c372f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          <h3 class="apaper-hobby-title">Travel</h3>
          <p class="apaper-hobby-note">collecting places, not things</p>
        </div>
        <div class="apaper-hobby">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3c372f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 19.5 15 9"/><path d="M14 4l6 6-2.5 2.5a2 2 0 0 1-2.8 0l-3.2-3.2a2 2 0 0 1 0-2.8z"/><circle cx="6.5" cy="6.5" r="2.5"/></svg>
          <h3 class="apaper-hobby-title">Cricket</h3>
          <p class="apaper-hobby-note">weekend all-rounder</p>
        </div>
        <div class="apaper-hobby">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3c372f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="4"/></svg>
          <h3 class="apaper-hobby-title">Photography</h3>
          <p class="apaper-hobby-note">chasing light</p>
        </div>
      </div>
      <div class="apaper-gallery-head">
        <p class="apaper-hand-label">From my camera roll</p>
      </div>
      <div class="apaper-coverflow-wrap">
        <div class="apaper-coverflow" id="flickr-polaroids">
          <div class="apaper-coverflow-stage" id="flickr-coverflow-stage">
            <p class="apaper-gallery-fallback">developing the film... if nothing shows up, <a href="https://www.flickr.com/photos/sujans_photography/" target="_blank" rel="noreferrer">see my photos on Flickr</a></p>
          </div>
          <button class="apaper-cf-btn apaper-cf-prev" aria-label="Previous photo" style="display:none;">&#8249;</button>
          <button class="apaper-cf-btn apaper-cf-next" aria-label="Next photo" style="display:none;">&#8250;</button>
          <div class="apaper-cf-dots" id="flickr-cf-dots"></div>
        </div>
      </div>
      <a class="apaper-flickr-link" href="https://www.flickr.com/photos/sujans_photography/" target="_blank" rel="noreferrer" aria-label="See more photos on my Flickr photostream">see more on Flickr
        <svg width="16" height="12" viewBox="0 0 24 14" aria-hidden="true"><path d="M1 8 C 8 4, 14 10, 21 6 M21 6 l-4 -3 M21 6 l-3 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>

  </div>
`;

export default function AboutPage() {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Camera roll 3D coverflow: static images
  useEffect(() => {
    let cleanupCarousel = () => {};

    (() => {
      const stage = document.getElementById('flickr-coverflow-stage');
      const dotsWrap = document.getElementById('flickr-cf-dots');
      const prevBtn = document.querySelector('.apaper-cf-prev');
      const nextBtn = document.querySelector('.apaper-cf-next');
      const root = document.getElementById('flickr-polaroids');
      if (!stage) return;

      const captions = ['Golden edge', 'Divine', 'Flag', 'Let me click the photo', 'Men @ Work', 'Perspective', 'Recollection of memories', 'Romantic Dusk', 'Folk Dance', 'Periwinkle tinkle', 'race with the time', 'the dream chasers', 'Traditions', 'Strict shadows', 'The passion', 'Architecture'];
      const items = Array.from({ length: 16 }, (_, i) => `/Portfolio-2026/images/Flickr${i + 1}.jpg`);

      stage.innerHTML = items.map((src, i) => {
        return `<div class="apaper-cf-card">
          <span class="apaper-tape apaper-tape-mini" aria-hidden="true"></span>
          <img src="${src}" alt="${captions[i]}" loading="lazy" />
          <span class="apaper-cf-caption">${captions[i]}</span>
        </div>`;
      }).join('');
      dotsWrap.innerHTML = items.map((_, i) => `<button class="apaper-cf-dot" aria-label="Go to photo ${i + 1}"></button>`).join('');

      const cards = Array.from(stage.querySelectorAll('.apaper-cf-card'));
      const dots = Array.from(dotsWrap.querySelectorAll('.apaper-cf-dot'));
      if (!cards.length) return;

      prevBtn.style.display = '';
      nextBtn.style.display = '';

      let active = 0;
      const render = () => {
        const narrow = window.matchMedia('(max-width:768px)').matches;
        const offsetX = narrow ? 90 : 170;
        const angle = narrow ? 25 : 40;
        const maxOffset = narrow ? 1 : 2;
        cards.forEach((card, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          card.style.transform = `translate(-50%,-50%) translateX(${offset * offsetX}px) rotateY(${offset * -angle}deg) scale(${offset === 0 ? 1 : 0.85})`;
          card.style.opacity = abs > maxOffset ? '0' : '1';
          card.style.zIndex = String(100 - abs);
          card.style.pointerEvents = abs > maxOffset ? 'none' : 'auto';
          card.classList.toggle('active', offset === 0);
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === active));
      };

      const goTo = (n) => { active = (n + cards.length) % cards.length; render(); };
      const prev = () => goTo(active - 1);
      const next = () => goTo(active + 1);

      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

      let timer = setInterval(next, 5000);
      const pause = () => clearInterval(timer);
      const resume = () => { clearInterval(timer); timer = setInterval(next, 5000); };
      root.addEventListener('mouseenter', pause);
      root.addEventListener('mouseleave', resume);

      const onResize = () => render();
      window.addEventListener('resize', onResize);

      render();

      cleanupCarousel = () => {
        clearInterval(timer);
        prevBtn.removeEventListener('click', prev);
        nextBtn.removeEventListener('click', next);
        root.removeEventListener('mouseenter', pause);
        root.removeEventListener('mouseleave', resume);
        window.removeEventListener('resize', onResize);
      };
    })();
    return () => {
      cleanupCarousel();
    };
  }, []);

  return (
    <div className="case-page about-me-page" id="case-about">
      <div dangerouslySetInnerHTML={{ __html: ABOUT_HTML }} />
    </div>
  );
}
