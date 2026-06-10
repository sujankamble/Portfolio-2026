import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useGlobalEffects.js';

const RESUME_HTML = `
  <div class="resume-shell reveal">

    <div class="resume-actions">
      <button class="resume-print-btn" id="resumePrintBtn" type="button" aria-label="Download resume as PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        Download PDF
      </button>
    </div>

    <div class="resume-grid">

      <aside class="resume-side">
        <div class="resume-photo">
          <img src="/Portfolio-2026/images/Profile picture 2.jpeg" alt="Sujan Kamble" />
        </div>
        <p class="resume-tag">// Senior UX Designer</p>
        <h1 class="resume-name">Sujan Kamble</h1>
        <p class="resume-subtitle">Enterprise Product Design &middot; 13+ Years</p>

        <ul class="resume-contact">
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:sujankamble@gmail.com">sujankamble@gmail.com</a></li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>9890936926</span></li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Pune, Maharashtra, India</span></li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg><a href="http://linkedin.com/in/sujan-kamble-02393930" target="_blank" rel="noreferrer">linkedin.com/in/sujankamble</a></li>
        </ul>

        <div class="resume-side-section">
          <p class="resume-tag">// Skills</p>
          <div class="resume-chips">
            <span class="resume-chip">UX Strategy &amp; Delivery</span>
            <span class="resume-chip">User Research</span>
            <span class="resume-chip">Wireframing</span>
            <span class="resume-chip">Hi-Fi Prototyping</span>
            <span class="resume-chip">Design Systems</span>
            <span class="resume-chip">Interaction Design</span>
            <span class="resume-chip">Information Architecture</span>
            <span class="resume-chip">Accessibility (WCAG AA)</span>
            <span class="resume-chip">Journey Mapping</span>
            <span class="resume-chip">Agile / Scrum</span>
            <span class="resume-chip">Mentoring</span>
          </div>
        </div>

        <div class="resume-side-section">
          <p class="resume-tag">// Tools</p>
          <div class="resume-chips">
            <span class="resume-chip">Figma</span>
            <span class="resume-chip">FigJam</span>
            <span class="resume-chip">Sketch</span>
            <span class="resume-chip">Adobe XD</span>
            <span class="resume-chip">Miro</span>
            <span class="resume-chip">Confluence</span>
            <span class="resume-chip">Jira</span>
          </div>
        </div>

        <div class="resume-side-section">
          <p class="resume-tag">// Education</p>
          <div class="resume-side-item">
            <p class="resume-side-item-title">Master of Design (UX Design)</p>
            <p class="resume-side-item-meta">Indian Institute of Technology, Guwahati</p>
            <p class="resume-side-item-date">2010 &ndash; 2012</p>
          </div>
          <div class="resume-side-item">
            <p class="resume-side-item-title">B.E., Electronics</p>
            <p class="resume-side-item-meta">Shivaji University, Kolhapur</p>
          </div>
        </div>

        <div class="resume-side-section">
          <p class="resume-tag">// Beyond the Brief</p>
          <div class="resume-side-item">
            <p class="resume-side-item-title">Design Internship &amp; HCI Monsoon Course</p>
            <p class="resume-side-item-meta">IDC, IIT Bombay, under Prof. Anirudha Joshi</p>
          </div>
          <div class="resume-side-item">
            <p class="resume-side-item-title">'DOJO' Design Studio Lead</p>
            <p class="resume-side-item-meta">Globant India</p>
          </div>
          <div class="resume-side-item">
            <p class="resume-side-item-title">Pat on the Back Award (x2), Design Excellence Awards</p>
            <p class="resume-side-item-meta">Globant &amp; Cognizant</p>
          </div>
        </div>

        <div class="resume-side-section">
          <p class="resume-tag">// Languages</p>
          <div class="resume-side-item resume-lang-row"><span>English</span><span class="resume-side-item-date">Professional</span></div>
          <div class="resume-side-item resume-lang-row"><span>Hindi</span><span class="resume-side-item-date">Native</span></div>
          <div class="resume-side-item resume-lang-row"><span>Marathi</span><span class="resume-side-item-date">Native</span></div>
        </div>
      </aside>

      <main class="resume-main">

        <div class="resume-stats stagger-wrap">
          <div class="resume-stat resume-stat-up stagger-child">
            <span class="resume-stat-num">+25%</span>
            <span class="resume-stat-label">Scoping Accuracy</span>
          </div>
          <div class="resume-stat resume-stat-down stagger-child">
            <span class="resume-stat-num">-30%</span>
            <span class="resume-stat-label">Auditor Task Time</span>
          </div>
          <div class="resume-stat stagger-child">
            <span class="resume-stat-num">4+</span>
            <span class="resume-stat-label">Product Lines</span>
          </div>
          <div class="resume-stat stagger-child">
            <span class="resume-stat-num">13+</span>
            <span class="resume-stat-label">Years Experience</span>
          </div>
        </div>

        <p class="resume-tag">// Experience</p>

        <article class="resume-job">
          <div class="resume-job-head">
            <h3 class="resume-job-role">Senior UX Designer</h3>
            <span class="resume-job-dates">Apr 2021 &ndash; Present &nbsp;&middot;&nbsp; Pune</span>
          </div>
          <p class="resume-job-org">Globant India Pvt. Ltd. &middot; Banking, Finance Audit, Insurance, Pharma</p>
          <ul class="resume-bullets">
            <li>Owned end-to-end UX delivery across 4 concurrent enterprise programmes: discovery, user research (contextual interviews, user goals mapping, usability testing), wireframing, high-fidelity prototyping, and dev-ready handoff across mobile-first B2C and complex enterprise platforms.</li>
            <li>Built design systems and pattern libraries from scratch and extended existing client systems, establishing token architecture, component governance, and accessibility annotations across 4+ product lines.</li>
            <li>Embedded WCAG 2.1 AA standards across nearly all projects at component and workflow level.</li>
            <li>Collaborated cross-functionally with Product and Engineering in Agile sprint ceremonies to define design strategy, shape quarterly roadmap priorities, and validate interaction flows with stakeholders.</li>
            <li>Delivered a 30% reduction in auditor task-completion time for a Finance Audit platform, and a no-code configurator enabling independent setup across 4+ insurance products without developer dependency.</li>
            <li>Mentored junior and intern designers, led hiring panels, and ran 'DOJO' design studio activities.</li>
          </ul>
        </article>

        <article class="resume-job">
          <div class="resume-job-head">
            <h3 class="resume-job-role">Senior Consultant, UX Design</h3>
            <span class="resume-job-dates">Jan 2020 &ndash; Feb 2021 &nbsp;&middot;&nbsp; Pune</span>
          </div>
          <p class="resume-job-org">Infosys Limited &middot; Banking &amp; Retail</p>
          <ul class="resume-bullets">
            <li>Led discovery and UX strategy across concurrent enterprise banking and retail engagements, including generative research (contextual interviews, JTBD mapping), interaction design, and PoC prototyping, improving scoping accuracy by approximately 25%.</li>
            <li>Synthesised research insights into validated interaction flows, prioritisation frameworks, and product roadmap recommendations for senior stakeholders.</li>
          </ul>
        </article>

        <article class="resume-job">
          <div class="resume-job-head">
            <h3 class="resume-job-role">UX Designer</h3>
            <span class="resume-job-dates">Jun 2014 &ndash; Feb 2020 &nbsp;&middot;&nbsp; Pune</span>
          </div>
          <p class="resume-job-org">Cognizant Technology Solutions &middot; Banking, Finance &amp; Big Data</p>
          <ul class="resume-bullets">
            <li>Delivered end-to-end UX across 10+ enterprise engagements in banking, finance, and big data: wireframes, prototypes, IA models, and UI specifications, reducing design rework by approximately 20%.</li>
            <li>Applied information architecture and user journey mapping principles to redesign complex data-heavy financial dashboards, recognised with 3 internal design excellence awards for research rigour, interaction quality, and cross-functional collaboration on high-visibility enterprise programmes.</li>
          </ul>
        </article>

        <article class="resume-job">
          <div class="resume-job-head">
            <h3 class="resume-job-role">Interaction Designer</h3>
            <span class="resume-job-dates">Dec 2012 &ndash; Feb 2014 &nbsp;&middot;&nbsp; Pune</span>
          </div>
          <p class="resume-job-org">Divami Software Pvt. Ltd. &middot; Enterprise Web Applications</p>
          <ul class="resume-bullets">
            <li>Designed interaction models and information architecture for enterprise web applications, conducting user research and iterative wireframing in close collaboration with visual designers and front-end engineers.</li>
          </ul>
        </article>

      </main>

    </div>
  </div>
`;

export default function ResumePage() {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const btn = document.getElementById('resumePrintBtn');
    if (!btn) return;
    const onClick = () => window.print();
    btn.addEventListener('click', onClick);
    return () => btn.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="case-page resume-page" id="case-resume">
      <div dangerouslySetInnerHTML={{ __html: RESUME_HTML }} />
    </div>
  );
}
