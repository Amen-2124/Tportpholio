import styles from './About.module.css';

const About = () => {

  const skills = [
    'HTML5 & CSS3',
    'Bootstrap',
    'JavaScript (ES6+)',
    'React.js',
    'Node.js',
    'Express.js',
    'MySQL',
    'REST APIs',
    'AI-Powered Apps',
    'GenAI Integration',
    'Git & GitHub',
    'npm & DevTools'
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ABOUT <span className={styles.highlight}>ME</span></h2>
      
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.label}>First Name:</span> <span className={styles.value}>Hana</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Last Name:</span> <span className={styles.value}>Asefa</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Age:</span> <span className={styles.value}>23</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Nationality:</span> <span className={styles.value}>Ethiopia</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Freelance:</span> <span className={styles.available}>Available</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Address:</span> <span className={styles.value}>Addis Ababa</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Phone:</span> <span className={styles.value}>+251923254240</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Email:</span> <span className={styles.value}>h1607322@gmail.com</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Languages:</span> <span className={styles.value}>English, Amharic</span>
        </div>
      </div>

      {/* MY SKILLS SECTION */}
      <div className={styles.skillsSection}>
        <h3 className={styles.subHeading}>MY <span className={styles.highlight}>SKILLS</span></h3>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.skillCard}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;