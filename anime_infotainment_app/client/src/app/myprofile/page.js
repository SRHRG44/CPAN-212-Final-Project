"use client";

import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';

export default function MyProfile() {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setProfile(userData);
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert('Profile saved!');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save profile');
      }
    } catch (err) {
      setError('An error occurred while saving profile');
      console.error('Error saving profile:', err);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     [name]: value,
  //   }));
  // };


  return (
    <div className={styles.profileContainer}>
      <form className={styles.profileForm}>
        <h1>My Profile</h1>
        <div className={styles.formGroup}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={profile.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={profile.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="button" onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
      </form>
    </div>
  );
}
