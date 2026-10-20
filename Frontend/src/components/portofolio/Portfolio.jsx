import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then((response) => {
        if (response.data.success) {
          setPortfolios(response.data.projects);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorText}>{error}</div>;
  }

  return (
    <section className={styles.portfolioSection}>
      {/* Background Title Watermark and Main Heading */}
      <div className={styles.headerContainer}>
        <h2 className={styles.watermarkText}>WORKS</h2>
        <h1 className={styles.mainTitle}>
          MY <span className={styles.highlightText}>PORTFOLIO</span>
        </h1>
      </div>

      {/* Projects Grid Container */}
      <div className={styles.gridContainer}>
        {portfolios.map((item) => {
          const imageUrl = item.project_image_url && !item.project_image_url.startsWith('http')
            ? `http://localhost:5000${item.project_image_url}`
            : item.project_image_url;

          return (
            <a
              key={item.id}
              href={item.project_live_demo || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              <div
                className={`${styles.projectCard} ${
                  !imageUrl ? styles.yellowCard : ''
                }`}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.project_title}
                    className={styles.cardImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className={styles.sliderTitle}>{item.project_title}</span>
                )}

                {/* Hover overlay effect */}
                <div className={styles.overlay}>
                  <span className={styles.overlayTitle}>{item.project_title}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;