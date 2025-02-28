"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    router.push("/"); // Redirect to homepage
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      {username ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "20px" }}>Welcome, {username}!</span>
          <span>One stop Anime & Manga</span>
        </div>
      ) : (
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/manga">Manga</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      )}

      {username && (
        <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
