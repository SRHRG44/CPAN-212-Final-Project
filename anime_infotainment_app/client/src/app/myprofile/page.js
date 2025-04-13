"use client";

import { useState, useEffect, useCallback } from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export default function MyProfile() {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');

  // --- Fetch Profile Data ---
  const fetchProfile = useCallback(async (token) => {
    setIsLoading(true);
    setError('');
    const profileUrl = `${API_BASE_URL}/profile`;
    console.log(`Fetching profile from: ${profileUrl}`);

    try {
      const response = await fetch(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setProfile(userData);
      } else {
        console.error(`Failed to fetch profile: ${response.status}`);
        setError(`Failed to fetch profile: ${response.status}`);
      }
    } catch (err) {
      console.error('Network error fetching profile:', err);
      setError(`Network error: Could not connect to the server at ${profileUrl}. Is it running? (${err.message})`);
    } finally {
      setIsLoading(false);
    }
  }, [router]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProfile(token);
  }, [router, fetchProfile]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setError("Authentication error. Please log in again.");
        router.push('/login');
        return;
    }

    setIsSaving(true);
    setError('');
    const profileUrl = `${API_BASE_URL}/profile`;
    console.log(`Saving profile to: ${profileUrl}`);

    try {
      const response = await fetch(profileUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
          const updatedProfile = await response.json();
        setProfile(updatedProfile);
          alert('Profile saved successfully!');
      } else {
        let errorMessage = `Failed to save profile: ${response.status}`;
        try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                errorMessage = data.message || errorMessage;
            } else {
                  const textResponse = await response.text();
                  errorMessage = textResponse || errorMessage;
                  console.warn("Received non-JSON error response on save:", textResponse);
            }
        } catch (parseError) {
            console.error("Could not parse error response on save", parseError);
        }
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Fetch API error saving profile:', err);
      setError(`Network error: Could not connect to the server at ${profileUrl}. Is it running? (${err.message})`);
    } finally {
        setIsSaving(false);
    }
  };


  if (isLoading) {
      return <div className={styles.profileContainer}><p>Loading profile...</p></div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileForm}>
        <h1>My Profile</h1>
        <div className={styles.formGroup}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={profile.first_name || ''}
            onChange={handleInputChange}
            disabled={isSaving}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={profile.last_name || ''}
            onChange={handleInputChange}
            disabled={isSaving}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email || ''}
            onChange={handleInputChange}
            disabled={isSaving}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="button" onClick={handleSave} className={styles.saveButton} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
