import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
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
