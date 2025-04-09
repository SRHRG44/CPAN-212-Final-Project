"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentlyLoggedIn = !!token;
    // console.log(`Navbar effect running for path: ${pathname}. Token found: ${currentlyLoggedIn}`); // Debug log
    setIsLoggedIn(currentlyLoggedIn);
  }, [pathname]); // <-- Add pathname as a dependency

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home after logout is often better than login
  };

  // Styles remain the same...
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
      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={buttonStyle}>Home</Link>
          <Link href="/manga" style={buttonStyle}>Manga</Link>
          <Link href="/about" style={buttonStyle}>About Us</Link>
          <Link href="/contact" style={buttonStyle}>Contact Us</Link>
          <Link href="/myprofile" style={buttonStyle}>My Profile</Link>
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <Link href="/" style={buttonStyle}>Home</Link>
          <Link href="/manga" style={buttonStyle}>Manga</Link>
          <Link href="/login" style={buttonStyle}>Login</Link>
          <Link href="/register" style={buttonStyle}>Register</Link>
          <Link href="/about" style={buttonStyle}>About Us</Link>
          <Link href="/contact" style={buttonStyle}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
