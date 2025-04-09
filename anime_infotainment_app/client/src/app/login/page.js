"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const contentType = response.headers.get("content-type");
      let data = {};
  
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        console.warn("Received non-JSON response:", response.status, response.statusText, textResponse);
        setError(textResponse || `Login failed: ${response.status} ${response.statusText}`);
        return;
      }
  
      if (response.ok) {
        console.log("Login successful, storing token...");
        localStorage.setItem("token", data.token); // Assuming your API returns a 'token' field
        router.push("/"); // Redirect to profile page
      } else {
        console.error("Login failed:", data);
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Fetch API error during login:", err);
      setError(`Network error: Could not connect to the server at ${API_BASE_URL}. Is it running? (${err.message})`);
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h1>Login</h1>
        <br />
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
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
