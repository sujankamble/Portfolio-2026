import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPScroll() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Hero mockup — parallax (moves slower than scroll)
      const mockup = document.querySelector('.cs-hero-mockup');
      if (mockup) {
        gsap.to(mockup, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cs-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Hero content — slight upward drift on scroll
      const heroContent = document.querySelector('.cs-hero-content');
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cs-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 3. Chapter dividers — fade + y drift as they scroll into view
      gsap.utils.toArray('.chapter-divider').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0.2, y: 24 },
          {
            opacity: 0.85, y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      });

      // 4. Pull quotes — subtle scale as they enter viewport
      gsap.utils.toArray('.cs-pull-quote').forEach(el => {
        gsap.fromTo(el,
          { scale: 0.97, opacity: 0.6 },
          {
            scale: 1, opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      });

      // 5. Project summary — subtle depth lift on scroll approach
      const summary = document.querySelector('.cs-project-summary-wrap');
      if (summary) {
        gsap.fromTo(summary,
          { y: 30 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: summary,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }

    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
