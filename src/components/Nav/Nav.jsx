import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const toggleTheme = useCallback(() => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    window.dispatchEvent(new Event('themechange'));
  }, []);

  const toggleDrawer = useCallback(() => setDrawerOpen(o => !o), []);

  const scrollToWork = useCallback(() => {
    if (!isHome) { navigate('/'); setTimeout(() => { const w = document.getElementById('work'); if (w) w.scrollIntoView({ behavior: 'smooth' }); }, 200); }
    else { const w = document.getElementById('work'); if (w) w.scrollIntoView({ behavior: 'smooth' }); }
  }, [isHome, navigate]);

  const navClass = [
    !isHome ? 'solid' : '',
    isHome && scrolled ? 'scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav id="nav" className={navClass}>
        <Link to="/" className="nav-mobile-name">Sujaan Kamble</Link>
        <div className="nav-left-spacer"></div>
        <ul className="nav-links">
          <li><Link to="/" className="nav-name-pill">Sujaan Kamble</Link></li>
          <li><div className="nav-pill-sep"></div></li>
          <li><button className="nav-link-btn" onClick={scrollToWork}>Work</button></li>
          <li><div className="nav-pill-sep"></div></li>
          <li><Link to="/about">About me</Link></li>
          <li><div className="nav-pill-sep"></div></li>
          <li><a href="/UX-portfolio_SK/docs/resume.pdf" download="Resume.pdf" className="nav-resume">Resume</a></li>
        </ul>
        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light/dark mode">
            <svg className="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg className="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </button>
          <button className={`nav-hamburger${drawerOpen ? ' open' : ''}`} onClick={toggleDrawer} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <button className="nav-link-btn" onClick={scrollToWork}>Work</button>
        <Link to="/about">About me</Link>
        <div className="drawer-divider"></div>
        <a href="/UX-portfolio_SK/docs/resume.pdf" download="Resume.pdf" className="drawer-resume">Resume</a>
      </div>
    </>
  );
}
