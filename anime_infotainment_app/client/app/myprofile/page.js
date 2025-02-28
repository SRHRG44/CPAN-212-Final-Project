"use client";

import { useState, useEffect } from "react";

export default function MyProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    birthday: "",
    country: "",
  });

  useEffect(() => {
    // Simulate fetching profile data from a backend or localStorage
    const storedUsername = localStorage.getItem("username"); //get username
    if (storedUsername) {
      //In a real application, you would make an API call here to get the users profile information.
      //For this example we are hardcoding the data, or using local storage.
      const storedProfile = localStorage.getItem("profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        setProfile({
          name: storedUsername,
          email: `${storedUsername}@example.com`,
          birthday: "1990-01-01",
          country: "Unknown",
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
    // Simulate saving profile data to a backend or localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div>
      <h1>My Profile</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={profile.birthday}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={profile.country}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
