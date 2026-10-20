import React from 'react';
import imageHana from "../../assets/images/hana.jpg";
import styles from "./Home.module.css"; // Importing CSS Module for scoped styling

function Home({ setActiveSection, activeSection }) {
  return (
    <div className={`${styles.sectionContent} ${styles.appContainer}`}>
      
      <div className={styles.heroContainer}>
        {/* Profile Picture Box with Floating Full-Stack Skill Badges */}
        <div className={styles.heroImgBox}>
          <div className={styles.imgPlaceholder}>
            <img src={imageHana} alt="Hana Asefa" />
          </div> 

          {/* Floating Skill Badges highlighting Full-Stack capabilities */}
          <div className={`${styles.floatingBadge} ${styles.badgeTop}`}>
            <span>💻 Full-Stack Dev</span>
          </div>
          <div className={`${styles.floatingBadge} ${styles.badgeLeft}`}>
            <span>⚛️ Frontend & UI</span>
          </div>
          <div className={`${styles.floatingBadge} ${styles.badgeRight}`}>
            <span>⚙️ Backend & DB</span>
          </div>
        </div>
        
        {/* Main Hero Introductory Text Section */}
        <div className={styles.heroTextBox}>
          <h1>I'M HANA ASEFA.<span>WEB DEVELOPER</span></h1>
          <p>
            I build clean, intuitive, and responsive web applications
            that transform complex ideas into effortless digital experiences. Passionate about both frontend design and robust backend architecture, I love crafting software that solves real-world problems and creates value for users.
          </p>
          
          {/* Navigation Button leading to the About Me section */}
          <button 
            className={`${styles.btnMore} ${activeSection === 'about' ? styles.activeIcon : ''}`}
            onClick={() => setActiveSection('about')}
            title="ABOUT ME"
          >
            <span>MORE ABOUT ME</span>
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;