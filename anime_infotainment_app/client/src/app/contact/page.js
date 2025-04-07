"use client";

import { useState } from "react";
import styles from './contact.module.css';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.formWrapper}>
        <h1>Contact Us</h1>
        <br />
        <p>Please fill out the form below to contact us.</p>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
        {submissionStatus === 'success' && (
          <p className={styles.successMessage}>Thank you for your message!</p>
        )}
        {submissionStatus === 'error' && (
          <p className={styles.errorMessage}>Failed to send message. Please try again.</p>
        )}
      </div>
    </div>
  );
}
