"use client"; // Important: Use client components for interactivity

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials for testing
    if (username === "admin" && password === "password123") {
      localStorage.setItem("username", username);
      router.push("/");
    } else {
      alert("Invalid username or password.");
    }
    // // Simulate successful login (replace with real authentication)
    // if (username && password) {
    //   localStorage.setItem("username", username); // Store username
    //   router.push("/"); // Redirect to homepage
    // } else {
    //   alert("Please enter username and password.");
    // }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
