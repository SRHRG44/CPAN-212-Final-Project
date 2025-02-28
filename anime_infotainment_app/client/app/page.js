"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';

export default function Home() {
  const [top10Animes, setTop10Animes] = useState([]);
  const [currentlyAiring, setCurrentlyAiring] = useState([]);
  const [myTop5Picks, setMyTop5Picks] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    // Replace with your actual data fetching logic
    setTop10Animes([
      { id: 1, title: "Attack on Titan", imageUrl: "/placeholder.jpg" },
      {
        id: 2,
        title: "Fullmetal Alchemist: Brotherhood",
        imageUrl: "/placeholder.jpg",
      },
      { id: 3, title: "Death Note", imageUrl: "/placeholder.jpg" },
      // ... more animes
    ]);

    setCurrentlyAiring([
      {
        id: 1,
        title: "Demon Slayer: Kimetsu no Yaiba",
        imageUrl: "/placeholder.jpg",
      },
      { id: 2, title: "Jujutsu Kaisen", imageUrl: "/placeholder.jpg" },
      // ... more animes
    ]);

    setMyTop5Picks([
      { id: 1, title: "Your Lie in April", imageUrl: "/placeholder.jpg" },
      { id: 2, title: "Steins;Gate", imageUrl: "/placeholder.jpg" },
      // ... more animes
    ]);
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.section}>
        <h2>Top 10 Animes</h2>
        <div className={styles.animeList}>
          {top10Animes.map((anime) => (
            <div key={anime.id} className={styles.animeItem}>
              <img src={anime.imageUrl} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Currently Airing</h2>
        <div className={styles.animeList}>
          {currentlyAiring.map((anime) => (
            <div key={anime.id} className={styles.animeItem}>
              <img src={anime.imageUrl} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>My Top 5 Anime Picks</h2>
        <div className={styles.animeList}>
          {myTop5Picks.map((anime) => (
            <div key={anime.id} className={styles.animeItem}>
              <img src={anime.imageUrl} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
