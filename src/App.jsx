import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ResumePage from './pages/ResumePage.jsx';
import Banking1Page from './pages/cases/Banking1Page.jsx';
import Banking2Page from './pages/cases/Banking2Page.jsx';
import AuditPage from './pages/cases/AuditPage.jsx';
import NoCodePage from './pages/cases/NoCodePage.jsx';
import MESPage from './pages/cases/MESPage.jsx';
import { useCursor } from './hooks/useGlobalEffects.js';

function Cursor() {
  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>
    </>
  );
}

const mobileVariants = {
  initial: { x: '100%', opacity: 1 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: 0, opacity: 1 },
};

function AnimatedRoutes() {
  const location = useLocation();
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={mobileVariants}
        >
          <Routes location={location}>
            <Route path="/"              element={<HomePage />} />
            <Route path="/about"         element={<AboutPage />} />
            <Route path="/resume"        element={<ResumePage />} />
            <Route path="/case/banking1" element={<Banking1Page />} />
            <Route path="/case/banking2" element={<Banking2Page />} />
            <Route path="/case/audit"    element={<AuditPage />} />
            <Route path="/case/nocode"   element={<NoCodePage />} />
            <Route path="/case/mes"      element={<MESPage />} />
          </Routes>
        </motion.div>
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/about"         element={<AboutPage />} />
          <Route path="/resume"        element={<ResumePage />} />
          <Route path="/case/banking1" element={<Banking1Page />} />
          <Route path="/case/banking2" element={<Banking2Page />} />
          <Route path="/case/audit"    element={<AuditPage />} />
          <Route path="/case/nocode"   element={<NoCodePage />} />
          <Route path="/case/mes"      element={<MESPage />} />
        </Routes>
      )}
    </AnimatePresence>
  );
}

function AppInner() {
  useCursor();
  return (
    <>
      <Cursor />
      <Nav />
      <AnimatedRoutes />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  );
}
