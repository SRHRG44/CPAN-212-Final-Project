"use client";

import { useState } from "react";
import styles from './contact.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [error, setError] = useState('');

        const handleSubmit = async (e) => {
          e.preventDefault();
          setSubmissionStatus('sending'); // Indicate processing
          setError('');

          const contactUrl = `${API_BASE_URL}/contact`; // Construct the full URL
          console.log(`Attempting to send contact message to: ${contactUrl}`); // Debug log

          try {
            const response = await fetch(contactUrl, {
              // const response = await fetch('/api/contact', {// <-- Use the full URL
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, message }),
            });

             // Check if response is OK, doesn't strictly need a JSON body for success maybe
            if (response.ok) {
              setSubmissionStatus('success');
              setName("");
              setEmail("");
              setMessage("");
            } else {
               // Try to get error message from body if it's JSON
              let errorMessage = `Failed to send message: ${response.status}`;
              try {
                  const contentType = response.headers.get("content-type");
                  if (contentType && contentType.indexOf("application/json") !== -1) {
                      const data = await response.json();
                      errorMessage = data.message || errorMessage;
                  } else {
                      const textResponse = await response.text();
                      errorMessage = textResponse || errorMessage;
                      console.warn("Received non-JSON error response:", textResponse);
                  }
              } catch (parseError) {
                  console.error("Could not parse error response", parseError);
              }
              setError(errorMessage);
              setSubmissionStatus('error');
            }
          } catch (err) {
            console.error("Fetch API error submitting form:", err);
            setError(`Network error: Could not connect to the server at ${contactUrl}. Is it running? (${err.message})`);
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
                    disabled={submissionStatus === 'sending'} // Disable while sending
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
                    disabled={submissionStatus === 'sending'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={submissionStatus === 'sending'}
                  />
                </div>
                <button type="submit" disabled={submissionStatus === 'sending'}>
                  {submissionStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {submissionStatus === 'success' && (
                <p className={styles.successMessage}>Thank you for your message!</p>
              )}
              {/* Show specific error message if available */}
              {submissionStatus === 'error' && (
                <p className={styles.errorMessage}>{error || 'Failed to send message. Please try again.'}</p>
              )}
            </div>
          </div>
        );
      }