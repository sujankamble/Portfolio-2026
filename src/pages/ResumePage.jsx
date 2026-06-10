import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useGlobalEffects.js';

const RESUME_HTML = `
  <div class="resume-wrap">

    <div class="resume-actions reveal">
      <button class="resume-print-btn" id="resumePrintBtn" type="button" aria-label="Download resume as PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
        Download PDF
      </button>
    </div>

    <header class="resume-header reveal">
      <h1 class="resume-name">Sujan Kamble</h1>
      <p class="resume-title">Senior UX Designer &middot; Enterprise Product Design &middot; 13+ Years</p>
      <ul class="resume-contact">
        <li><a href="mailto:sujankamble@gmail.com">sujankamble@gmail.com</a></li>
        <li>9890936926</li>
        <li><a href="http://linkedin.com/in/sujan-kamble-02393930" target="_blank" rel="noreferrer">linkedin.com/in/sujankamble</a></li>
        <li>Pune, Maharashtra, India</li>
      </ul>
    </header>

    <div class="resume-grid">

      <div class="resume-main">

        <section class="resume-section reveal">
          <h2 class="resume-section-title">Summary</h2>
          <p class="resume-summary">Senior UX Designer with 13+ years delivering enterprise-grade digital solutions across banking, financial services, insurance, and healthcare. Proven ability to translate complex business requirements into scalable, intuitive experiences that drive measurable improvements in usability and operational efficiency. A practitioner of human-centred design across the full lifecycle, from generative research and wireframing through design systems and WCAG AA accessible delivery. Adept at leading cross-functional programmes in Agile environments, advising senior stakeholders, and mentoring design talent, consistently recognised for strategic thinking, design craft, and high-quality execution in global organisations.</p>
        </section>

        <section class="resume-section reveal">
          <h2 class="resume-section-title">Professional Experience</h2>

          <article class="resume-job">
            <div class="resume-job-head">
              <div>
                <h3 class="resume-job-role">Senior UX Designer</h3>
                <p class="resume-job-org">Globant India Pvt. Ltd.</p>
              </div>
              <div class="resume-job-meta">
                <span class="resume-job-dates">April 2021 &ndash; Present</span>
                <span class="resume-job-loc">Pune, India</span>
              </div>
            </div>
            <p class="resume-job-domains">Domains: Banking, Finance Audit, Insurance, Pharmaceutical Manufacturing</p>
            <ul class="resume-bullets">
              <li>Owned end-to-end UX delivery across 4 concurrent enterprise programmes: discovery, user research (contextual interviews, user goals mapping, usability testing), wireframing, high-fidelity prototyping, and dev-ready handoff across mobile-first B2C and complex enterprise platforms.</li>
              <li>Built design systems and pattern libraries from scratch and extended existing client systems, establishing token architecture, component governance, and accessibility annotations across 4+ product lines.</li>
              <li>Embedded WCAG 2.1 AA standards across nearly all projects at component and workflow level.</li>
              <li>Collaborated cross-functionally with Product and Engineering in Agile sprint ceremonies to define design strategy, shape quarterly roadmap priorities, and validate interaction flows with stakeholders.</li>
              <li>Delivered measurable outcomes: a 30% reduction in auditor task-completion time for a Finance Audit platform, and a no-code configurator enabling independent setup across 4+ insurance products without developer dependency.</li>
              <li>Mentored junior and intern designers, and led hiring panels to strengthen team capability.</li>
              <li>Led 'DOJO' design studio activities.</li>
            </ul>
          </article>

          <article class="resume-job">
            <div class="resume-job-head">
              <div>
                <h3 class="resume-job-role">Senior Consultant, UX Design</h3>
                <p class="resume-job-org">Infosys Limited</p>
              </div>
              <div class="resume-job-meta">
                <span class="resume-job-dates">Jan 2020 &ndash; Feb 2021</span>
                <span class="resume-job-loc">Pune, India</span>
              </div>
            </div>
            <ul class="resume-bullets">
              <li>Led discovery and UX strategy across concurrent enterprise banking and retail engagements, including generative research (contextual interviews, JTBD mapping), interaction design, and PoC prototyping, improving scoping accuracy by approximately 25%.</li>
              <li>Synthesised research insights into validated interaction flows, prioritisation frameworks, and product roadmap recommendations for senior stakeholders.</li>
            </ul>
          </article>

          <article class="resume-job">
            <div class="resume-job-head">
              <div>
                <h3 class="resume-job-role">UX Designer</h3>
                <p class="resume-job-org">Cognizant Technology Solutions</p>
              </div>
              <div class="resume-job-meta">
                <span class="resume-job-dates">June 2014 &ndash; Feb 2020</span>
                <span class="resume-job-loc">Pune, India</span>
              </div>
            </div>
            <ul class="resume-bullets">
              <li>Delivered end-to-end UX across 10+ enterprise engagements in banking, finance, and big data: wireframes, prototypes, IA models, and UI specifications, reducing design rework by approximately 20%.</li>
              <li>Applied information architecture and user journey mapping principles to redesign complex data-heavy financial dashboards, recognised with 3 internal design excellence awards for research rigour, interaction quality, and cross-functional collaboration on high-visibility enterprise programmes.</li>
            </ul>
          </article>

          <article class="resume-job">
            <div class="resume-job-head">
              <div>
                <h3 class="resume-job-role">Interaction Designer</h3>
                <p class="resume-job-org">Divami Software Pvt. Ltd.</p>
              </div>
              <div class="resume-job-meta">
                <span class="resume-job-dates">Dec 2012 &ndash; Feb 2014</span>
                <span class="resume-job-loc">Pune, India</span>
              </div>
            </div>
            <ul class="resume-bullets">
              <li>Designed interaction models and information architecture for enterprise web applications, conducting user research and iterative wireframing in close collaboration with visual designers and front-end engineers.</li>
            </ul>
          </article>
        </section>

        <section class="resume-section reveal">
          <h2 class="resume-section-title">Education</h2>
          <ul class="resume-edu">
            <li>
              <div class="resume-edu-head"><span class="resume-edu-name">Master of Design (M.Des.), Indian Institute of Technology (IIT) Guwahati</span><span class="resume-edu-dates">2010 &ndash; 2012</span></div>
            </li>
            <li><div class="resume-edu-head"><span class="resume-edu-name">Bachelor of Engineering (Electronics), Shivaji University, Kolhapur</span></div></li>
            <li><div class="resume-edu-head"><span class="resume-edu-name">Design Internship, IDC, IIT Bombay, under Prof. Anirudha Joshi</span></div></li>
            <li><div class="resume-edu-head"><span class="resume-edu-name">HCI Monsoon Course, IDC, IIT Bombay, under Prof. Anirudha Joshi (Student Volunteer)</span></div></li>
          </ul>
        </section>

      </div>

      <aside class="resume-side">

        <section class="resume-section reveal-left">
          <h2 class="resume-section-title">Core Competencies</h2>
          <div class="resume-tags">
            <span class="resume-tag">End-to-End UX Strategy &amp; Delivery</span>
            <span class="resume-tag">User Research &amp; Usability Evaluation</span>
            <span class="resume-tag">Wireframing &amp; High-Fidelity Prototyping</span>
            <span class="resume-tag">Design Systems &amp; Pattern Libraries</span>
            <span class="resume-tag">Interaction &amp; Interface Design</span>
            <span class="resume-tag">Information Architecture</span>
            <span class="resume-tag">Accessibility (WCAG 2.1 AA)</span>
            <span class="resume-tag">Journey Mapping &amp; Service Design</span>
            <span class="resume-tag">Data-Driven &amp; Analytics-Led Design</span>
            <span class="resume-tag">Human-Centred Design (HCD)</span>
            <span class="resume-tag">Design Thinking Facilitation</span>
            <span class="resume-tag">Cross-functional Team Leadership</span>
            <span class="resume-tag">Agile / Scrum Delivery</span>
            <span class="resume-tag">Mentoring &amp; Talent Development</span>
          </div>
        </section>

        <section class="resume-section reveal-left">
          <h2 class="resume-section-title">Tools &amp; Technologies</h2>
          <div class="resume-tool-group">
            <p class="resume-tool-label">Design &amp; Prototyping</p>
            <p class="resume-tool-list">Figma (primary), Sketch, Adobe XD</p>
          </div>
          <div class="resume-tool-group">
            <p class="resume-tool-label">Collaboration &amp; Facilitation</p>
            <p class="resume-tool-list">FigJam, Miro, Confluence, Jira</p>
          </div>
          <div class="resume-tool-group">
            <p class="resume-tool-label">Languages</p>
            <p class="resume-tool-list">English, Marathi, Hindi</p>
          </div>
        </section>

        <section class="resume-section reveal-left">
          <h2 class="resume-section-title">Awards &amp; Recognition</h2>
          <ul class="resume-award-list">
            <li><span class="resume-award-name">Pat on the Back Award</span><span class="resume-award-org">Globant India, Jul 2025</span></li>
            <li><span class="resume-award-name">Pat on the Back Award</span><span class="resume-award-org">Globant India, May 2024</span></li>
            <li><span class="resume-award-name">Best Designer for Research Projects</span><span class="resume-award-org">Cognizant Technology Solutions</span></li>
            <li><span class="resume-award-name">Digital Superstar 'DEP Dynamo' Award</span><span class="resume-award-org">Cognizant Technology Solutions</span></li>
            <li><span class="resume-award-name">Interactive Design Excellence Award</span><span class="resume-award-org">Cognizant Technology Solutions</span></li>
          </ul>
        </section>

      </aside>

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
