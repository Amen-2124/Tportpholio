/**
 * Component Name: Contact
 * Description: Handles user contact form submissions with strict real-time input validations,
 *              character limitations, live API integration via Axios, and displays professional
 *              social media profile links.
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
  // State management for form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // UI state for loading indicators and status message alerts
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({ type: '', text: '' });

  /**
   * Handle real-time input changes and apply strict formatting or length restrictions
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict Name field to alphabetic characters and whitespace only
    if (name === 'name') {
      const alphaOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: alphaOnly }));
      return;
    }

    // Restrict Subject length to a maximum of 100 characters
    if (name === 'subject') {
      if (value.length <= 100) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Restrict Message length to a maximum of 500 characters
    if (name === 'message') {
      if (value.length <= 500) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Default handler for standard inputs (e.g., email)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle comprehensive client-side form validation and asynchronous submission via Axios
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Full Name Validation: Require at least first and last name (min 2 chars each)
    const nameParts = formData.name.trim().split(/\s+/);
    if (nameParts.length < 2 || nameParts[0].length < 2 || nameParts[1].length < 2) {
      setResponseMsg({
        type: 'error',
        text: 'Please enter your full name (First and Last name, at least 2 characters each).'
      });
      return;
    }

    // 2. Email Pattern Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setResponseMsg({
        type: 'error',
        text: 'Please enter a valid email address (e.g., name@example.com).'
      });
      return;
    }

    // 3. Subject Length Validation: Require at least 4 characters
    if (formData.subject.trim().length < 4) {
      setResponseMsg({
        type: 'error',
        text: 'Subject is too short. Please provide a clear subject (at least 4 characters).'
      });
      return;
    }

    // 4. Message Length Validation: Require at least 10 characters
    if (formData.message.trim().length < 10) {
      setResponseMsg({
        type: 'error',
        text: 'Message is too short. Please provide at least 10 characters.'
      });
      return;
    }

    setLoading(true);
    setResponseMsg({ type: '', text: '' });

    try {
      // Dispatch POST request to the live cPanel backend API endpoint
      const response = await axios.post('https://api.hanastack.com/api/contact', formData);

      if (response.data.success) {
        setResponseMsg({
          type: 'success',
          text: response.data.msg || 'Thank you! Your message has been sent successfully.'
        });

        // Clear input form fields upon successful transmission
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Automatically clear success notification message after 4 seconds
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
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.bgTitle}>CONTACT</h2>
        <h2 className={styles.mainTitle}>
          GET IN <span className={styles.highlight}>TOUCH</span>
        </h2>
      </div>

      <div className={styles.contactContainer}>
        {/* Left Column: Direct Contact Details & Professional Social Profiles */}
        <div className={styles.contactInfo}>
          <h3 className={styles.infoHeading}>LET'S CONNECT!</h3>
          <p className={styles.infoText}>
            Whether you have a new project in mind, a full-stack development role to discuss, 
            or just want to connect—my inbox is always open. Let’s build something great together!
          </p>

          {/* Email Direct Link Card */}
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
                <span className={styles.label}>EMAIL ME</span>
                <span className={styles.value}>hanaasefa86@gmail.com</span>
              </div>
            </a>
          </div>

          {/* Phone Direct Link Card */}
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

          {/* Social Media & Code Repository Profile Links */}
          <div className={styles.socialIcons}>
            <a 
              href="https://github.com/Hana-Asefa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon} 
              title="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon} 
              title="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://t.me/Sylvain1921" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon} 
              title="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon} 
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://wa.me/251923254240" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon} 
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {/* Status Message Notification Feedback */}
          {responseMsg.text && (
            <div className={responseMsg.type === 'success' ? styles.successMessage : styles.errorMessage}>
              {responseMsg.text}
            </div>
          )}

          {/* Form Top Row: User Inputs */}
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="FULL NAME (FIRST & LAST)"
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
              placeholder="YOUR SUBJECT (MIN 4 CHARS)"
              value={formData.subject}
              onChange={handleChange}
              maxLength={100}
              required
              className={styles.inputField}
            />
          </div>

          {/* Form Bottom Row: Message Textarea with Character Counter */}
          <div className={styles.formFullRow}>
            <textarea
              name="message"
              rows="6"
              placeholder="YOUR MESSAGE (MAX 500 CHARACTERS)"
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

          {/* Form Submission Action Button */}
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