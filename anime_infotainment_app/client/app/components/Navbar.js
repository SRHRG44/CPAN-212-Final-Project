"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log('Username from localStorage:', storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    router.push('/'); // Redirect to homepage
  };

  const buttonStyle = {
    margin: '0 13px',
    fontSize: '30px',
    padding: '6px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    background: '#b20707',
    fontFamily: 'inherit',
    fontSize: 'inherit',
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {username ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={buttonStyle}>Home</Link>
          <Link href="/about" style={buttonStyle}>About Us</Link>
          <Link href="/manga" style={buttonStyle}>Manga</Link>
          <Link href="/contact" style={buttonStyle}>Contact Us</Link>
          <Link href="/myprofile" style={buttonStyle}>My Profile</Link>
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <Link href="/" style={buttonStyle}>Home</Link>
          <Link href="/login" style={buttonStyle}>Login</Link>
          <Link href="/register" style={buttonStyle}>Register</Link>
          <Link href="/about" style={buttonStyle}>About Us</Link>
          <Link href="/manga" style={buttonStyle}>Manga</Link>
          <Link href="/contact" style={buttonStyle}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
