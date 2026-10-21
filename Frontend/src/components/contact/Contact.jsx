/**
 * Component Name: Contact
 * Description: Fully responsive contact section featuring real-time input validations,
 *              character limit tracking, mobile scroll fixes, and API post integration.
 * Author: Full-Stack Developer Portfolio
 */

import React, { useState } from 'react';
import styles from './Contact.module.css';
import { 
  FaTelegramPlane, 
  FaInstagram, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaGithub, 
  FaLinkedin 
} from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  // State management for form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State management for API interaction states
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({ type: '', text: '' });

  /**
   * Real-time input validation and character restricting handler
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filter non-alphabetic characters in the name field
    if (name === 'name') {
      const alphaOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: alphaOnly }));
      return;
    }

    // Limit subject length to 100 characters max
    if (name === 'subject') {
      if (value.length <= 100) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Limit message length to 500 characters max
    if (name === 'message') {
      if (value.length <= 500) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Default change handler
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Form submission and asynchronous dispatching via Axios
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Full Name Validation (Requires First and Last name)
    const nameParts = formData.name.trim().split(/\s+/);
    if (nameParts.length < 2 || nameParts[0].length < 2 || nameParts[1].length < 2) {
      setResponseMsg({
        type: 'error',
        text: 'Please enter your full name (First and Last name, at least 2 characters each).'
      });
      return;
    }

    // 2. Email Pattern Verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setResponseMsg({
        type: 'error',
        text: 'Please enter a valid email address.'
      });
      return;
    }

    // 3. Subject Length Verification
    if (formData.subject.trim().length < 4) {
      setResponseMsg({
        type: 'error',
        text: 'Subject is too short. Minimum 4 characters required.'
      });
      return;
    }

    // 4. Message Body Validation
    if (formData.message.trim().length < 10) {
      setResponseMsg({
        type: 'error',
        text: 'Message is too short. Minimum 10 characters required.'
      });
      return;
    }

    setLoading(true);
    setResponseMsg({ type: '', text: '' });

    try {
      // Send post request to API endpoint
      const response = await axios.post('https://api.hanastack.com/api/contact', formData);

      if (response.data.success) {
        setResponseMsg({
          type: 'success',
          text: response.data.msg || 'Thank you! Your message has been sent successfully.'
        });

        // Reset inputs on success
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => {
          setResponseMsg({ type: '', text: '' });
        }, 4000);
      }
    } catch (error) {
      console.error('API Submission Error:', error);
      const errorText =
        error.response?.data?.error?.message ||
        error.response?.data?.msg ||
        'Failed to send message. Please try again.';
      setResponseMsg({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      {/* Header Container */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.bgTitle}>CONTACT</h2>
        <h2 className={styles.mainTitle}>
          GET IN <span className={styles.highlight}>TOUCH</span>
        </h2>
      </div>

      <div className={styles.contactContainer}>
        {/* Left Info Column */}
        <div className={styles.contactInfo}>
          <h3 className={styles.infoHeading}>DON'T BE SHY !</h3>
          <p className={styles.infoText}>
            Feel free to get in touch with me. I am always open to discussing new
            projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className={styles.infoItem}>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hanaasefa86@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.infoLink}
            >
              <div className={styles.iconBox}>
                <FaEnvelope />
              </div>
              <div>
                <span className={styles.label}>MAIL ME</span>
                <span className={styles.value}>hanaasefa86@gmail.com</span>
              </div>
            </a>
          </div>

          <div className={styles.infoItem}>
            <a href="tel:+251923254240" className={styles.infoLink}>
              <div className={styles.iconBox}>
                <FaPhoneAlt />
              </div>
              <div>
                <span className={styles.label}>CALL ME</span>
                <span className={styles.value}>+251 92 325 4240</span>
              </div>
            </a>
          </div>

          <div className={styles.socialIcons}>
            <a href="https://github.com/Hana-Asefa" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="GitHub Profile">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="LinkedIn Profile">
              <FaLinkedin />
            </a>
            <a href="https://t.me/Sylvain1921" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Telegram">
              <FaTelegramPlane />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/251923254240" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Right Form Column */}
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {responseMsg.text && (
            <div className={responseMsg.type === 'success' ? styles.successMessage : styles.errorMessage}>
              {responseMsg.text}
            </div>
          )}

          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={handleChange}
              maxLength={50}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="YOUR EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="subject"
              placeholder="YOUR SUBJECT"
              value={formData.subject}
              onChange={handleChange}
              maxLength={100}
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.formFullRow}>
            <textarea
              name="message"
              rows="6"
              placeholder="YOUR MESSAGE"
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              required
              className={styles.textareaField}
            ></textarea>
            <div className={styles.charCounter}>
              {formData.message.length} / 500 characters
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <span>{loading ? 'SENDING...' : 'SEND MESSAGE'}</span>
            <div className={styles.btnIconBox}>
              <FaTelegramPlane />
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;