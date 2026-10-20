import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home/Home';
import About from './components/about/About';
import Portfolio from './components/portofolio/Portfolio';
import Contact from './components/contact/Contact';
import Sidebar from './components/sidebar/Sidebar';
import PageTransition from './components/PageTransition/PageTransition';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    if (isReload) {
      const savedSection = sessionStorage.getItem('activeSection');
      return savedSection ? savedSection : 'home';
    } else {
      return 'home';
    }
  });

  useEffect(() => {
    sessionStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home setActiveSection={setActiveSection} activeSection={activeSection} />;
      case 'about':
        return <About />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveSection={setActiveSection} activeSection={activeSection} />;
    }
  };

  return (
    <div className="app-container">
      <main className="main-content-area">
        <AnimatePresence mode="wait">
          <PageTransition activeKey={activeSection}>
            {renderContent()}
          </PageTransition>
        </AnimatePresence>
      </main>

      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}

export default App;