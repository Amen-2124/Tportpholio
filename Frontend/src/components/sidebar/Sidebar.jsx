import React from 'react';
import { FaHome, FaUser, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import styles from "./Sidebar.module.css"; 

function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside className={styles.sidebarContainer}>
      <ul>
        {/* Home Section Button */}
        <li>
          <button
            className={`${styles.navBtn} ${activeSection === 'home' ? styles.active : ''}`}
            onClick={() => setActiveSection('home')}
            title="Home"
          >
            <FaHome />
          </button>
        </li>

        {/* About Section Button */}
        <li>
          <button
            className={`${styles.navBtn} ${activeSection === 'about' ? styles.active : ''}`}
            onClick={() => setActiveSection('about')}
            title="About"
          >
            <FaUser />
          </button>
        </li>

        {/* Portfolio Section Button */}
        <li>
          <button
            className={`${styles.navBtn} ${activeSection === 'portfolio' ? styles.active : ''}`}
            onClick={() => setActiveSection('portfolio')}
            title="Portfolio"
          >
            <FaBriefcase />
          </button>
        </li>

        {/* Contact Section Button */}
        <li>
          <button
            className={`${styles.navBtn} ${activeSection === 'contact' ? styles.active : ''}`}
            onClick={() => setActiveSection('contact')}
            title="Contact"
          >
            <FaEnvelope />
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;