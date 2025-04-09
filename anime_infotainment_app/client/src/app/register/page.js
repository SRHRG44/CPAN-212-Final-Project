"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './register.module.css';

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // --- >>> THE CRUCIAL CHANGE IS HERE <<< ---
        // Use the full URL of your running Express server (port 8000)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/register";

        console.log(`Sending registration request to: ${apiUrl}`); // Debug log

        const response = await fetch(apiUrl, { // <--- Make sure this uses the full apiUrl
        // const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleRegister} className={styles.registerForm}>
        <h1>Register</h1>
        <br />
        <div className={styles.formGroup}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}