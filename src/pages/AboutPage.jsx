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
        <div class="apaper-stamp" aria-hidden="true"><span>PUNE · INDIA · UX ·</span></div>
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
        <div class="apaper-stamp apaper-stamp-gallery" aria-hidden="true"><span>SHOT · ON · LOCATION ·</span></div>
      </div>
      <div class="apaper-polaroids" id="flickr-polaroids">
        <p class="apaper-gallery-fallback">developing the film... if nothing shows up, <a href="https://www.flickr.com/photos/sujans_photography/" target="_blank" rel="noreferrer">see my photos on Flickr</a></p>
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

  // Flickr polaroid wall: public JSONP feed, no API key
  useEffect(() => {
    const cb = 'aboutFlickrFeed';
    window[cb] = (data) => {
      const wall = document.getElementById('flickr-polaroids');
      if (!wall || !data?.items?.length) return;
      const items = data.items.slice(0, 6);
      wall.innerHTML = items.map((it, i) => {
        const src = (it.media?.m || '').replace('_m.jpg', '_z.jpg');
        if (!src) return '';
        return `<a class="apaper-polaroid apaper-polaroid-sm" href="https://www.flickr.com/photos/sujans_photography/" target="_blank" rel="noreferrer" aria-label="Photo from my Flickr photostream">
          <span class="apaper-tape apaper-tape-mini" aria-hidden="true"></span>
          <img src="${src}" alt="" loading="lazy" />
        </a>`;
      }).join('');
    };
    const script = document.createElement('script');
    script.src = 'https://www.flickr.com/services/feeds/photos_public.gne?id=sujans_photography&format=json&jsoncallback=' + cb;
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); delete window[cb]; };
  }, []);

  return (
    <div className="case-page about-me-page" id="case-about">
      <div dangerouslySetInnerHTML={{ __html: ABOUT_HTML }} />
    </div>
  );
}
