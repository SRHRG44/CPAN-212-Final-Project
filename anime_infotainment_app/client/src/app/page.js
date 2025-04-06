"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';

export default function Home() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonalAnimes, setSeasonalAnimes] = useState([]);
  const [topMangas, setTopMangas] = useState([]);

  useEffect(() => {
    const fetchTopData = async () => {
      try {
        const animeResponse = await fetch("https://api.jikan.moe/v4/top/anime");
        const animeData = await animeResponse.json();
        setTopAnimes(animeData.data.slice(0, 10));

        const mangaResponse = await fetch("https://api.jikan.moe/v4/top/manga");
        const mangaData = await mangaResponse.json();
        setTopMangas(mangaData.data.slice(0, 10));

        const seasonalResponse = await fetch("https://api.jikan.moe/v4/seasons/2024/spring");
        const seasonalData = await seasonalResponse.json();
        setSeasonalAnimes(seasonalData.data.slice(0, 10));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.section}>
        <h2>Top 10 Animes</h2>
        <div className={styles.animeList}>
          {topAnimes.map((anime) => (
            <div key={anime.mal_id} className={styles.animeItem}>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Seasonal Animes</h2>
        <div className={styles.animeList}>
          {seasonalAnimes.map((anime) => (
            <div key={anime.mal_id} className={styles.animeItem}>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Top 10 Mangas</h2>
        <div className={styles.animeList}>
          {topMangas.map((manga) => (
            <div key={manga.mal_id} className={styles.animeItem}>
              <img src={manga.images.jpg.image_url} alt={manga.title} />
              <p>{manga.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}