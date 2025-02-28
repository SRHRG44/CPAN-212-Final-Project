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

  const buttonStyle = {
    margin: '0 10px',
    padding: '8px 12px',
    border: '1px solid #ccc', // Add border
    borderRadius: '4px', // Optional: Add rounded corners
    cursor: 'pointer', // Optional: Change cursor to pointer
    textDecoration: 'none', // Remove underline from Link
    color: 'inherit', // Inherit color from parent
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {username ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={handleLogout} style={{ ...buttonStyle, marginLeft: 'auto' }}>Logout</button>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <Link href="/" style={buttonStyle}>Home</Link>
          <Link href="/login" style={buttonStyle}>Login</Link>
          <Link href="/manga" style={buttonStyle}>Manga</Link>
          <Link href="/register" style={buttonStyle}>Register</Link>
          <Link href="/about" style={buttonStyle}>About Us</Link>
          <Link href="/contact" style={buttonStyle}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
