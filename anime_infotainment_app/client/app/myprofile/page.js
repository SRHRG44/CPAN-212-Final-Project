"use client";

import { useState, useEffect } from 'react';
import styles from './profile.module.css';

export default function MyProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    birthday: '',
    country: '',
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      const storedProfile = localStorage.getItem('profile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        setProfile({
          name: storedUsername,
          email: `${storedUsername}@example.com`,
          birthday: '1990-01-01',
          country: 'Unknown',
        });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile saved!');
  };

  return (
    <div className={styles.profileContainer}>
      <form className={styles.profileForm}>
        <h1>My Profile</h1>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
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
        <div className={styles.formGroup}>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={profile.birthday}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={profile.country}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
      </form>
    </div>
  );
}
