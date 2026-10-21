import React, { useState } from 'react';
import { FaHome, FaUser, FaBriefcase, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import styles from "./Sidebar.module.css"; 

function Sidebar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically close the menu when a link is clicked
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile/Tablet Hamburger Toggle Button */}
      <button 
        className={styles.menuToggleBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Menu"
      >
        <FaBars />
      </button>

      {/* Dark Backdrop Overlay */}
      {isOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsOpen(false)}
          title="Click outside to close menu"
        />
      )}

      {/* Main Sidebar Container (Half-Screen Left Drawer) */}
      <aside className={`${styles.sidebarContainer} ${isOpen ? styles.menuOpen : ''}`}>
        {/* Right Close Icon (✕) inside drawer */}
        <button 
          className={styles.closeBtn} 
          onClick={() => setIsOpen(false)}
          aria-label="Close Menu"
        >
          <FaTimes />
        </button>

        <ul>
          {/* Home Link */}
          <li>
            <button
              className={`${styles.navBtn} ${activeSection === 'home' ? styles.active : ''}`}
              onClick={() => handleNavClick('home')}
              title="HOME"
            >
              <FaHome className={styles.icon} />
              <span className={styles.navLabel}>HOME</span>
            </button>
          </li>

          {/* About Link */}
          <li>
            <button
              className={`${styles.navBtn} ${activeSection === 'about' ? styles.active : ''}`}
              onClick={() => handleNavClick('about')}
              title="ABOUT"
            >
              <FaUser className={styles.icon} />
              <span className={styles.navLabel}>ABOUT</span>
            </button>
          </li>

          {/* Portfolio Link */}
          <li>
            <button
              className={`${styles.navBtn} ${activeSection === 'portfolio' ? styles.active : ''}`}
              onClick={() => handleNavClick('portfolio')}
              title="PORTFOLIO"
            >
              <FaBriefcase className={styles.icon} />
              <span className={styles.navLabel}>PORTFOLIO</span>
            </button>
          </li>

          {/* Contact Link */}
          <li>
            <button
              className={`${styles.navBtn} ${activeSection === 'contact' ? styles.active : ''}`}
              onClick={() => handleNavClick('contact')}
              title="CONTACT"
            >
              <FaEnvelope className={styles.icon} />
              <span className={styles.navLabel}>CONTACT</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;