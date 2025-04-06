"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [topMangas, setTopMangas] = useState([]);
  const [seasonalAnimes, setSeasonalAnimes] = useState([]);
  const router = useRouter();

  const fetchTopData = async (retryCount = 0) => {
    try {
      const animeResponse = await fetch("https://api.jikan.moe/v4/top/anime");
      const animeData = await animeResponse.json();
      if (animeData && Array.isArray(animeData.data)) {
        setTopAnimes(animeData.data.slice(0, 10));
      } else {
        console.error("Anime data is invalid:", animeData);
        setTopAnimes([]);
      }

      const mangaResponse = await fetch("https://api.jikan.moe/v4/top/manga");
      const mangaData = await mangaResponse.json();
      if (mangaData && Array.isArray(mangaData.data)) {
        setTopMangas(mangaData.data.slice(0, 10));
      } else {
        console.error("Manga data is invalid:", mangaData);
        setTopMangas([]);
      }

      const seasonalResponse = await fetch("https://api.jikan.moe/v4/seasons/2024/spring");
      const seasonalData = await seasonalResponse.json();
      if (seasonalData && Array.isArray(seasonalData.data)) {
        setSeasonalAnimes(seasonalData.data.slice(0, 10));
      } else {
        console.error("Seasonal data is invalid:", seasonalData);
        setSeasonalAnimes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.message.includes("429") && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.warn(`Rate limit exceeded. Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        await fetchTopData(retryCount + 1);
      }
    }
  };

  useEffect(() => {
    fetchTopData();
  }, [router.pathname]); // Use router.pathname as dependency

  const handleImageError = (e) => {
    e.target.src = '/placeholder.png';
  };

  const openModal = (item) => {
    let url = `/anime/${item.mal_id}`;
    if (item.type === 'manga') {
      url = `/manga/${item.mal_id}`;
    }
    router.push(url);
  };


  return (
    <div className={styles.homeContainer}>
      <div className={styles.section}>
        <h2>Top 10 Animes</h2>
        <div className={styles.animeList}>
          {topAnimes.map((anime) => (
            <div key={anime.mal_id} className={styles.animeItem} onClick={() => openModal(anime)}>
              <img src={anime.images.jpg.image_url} alt={anime.title} onError={handleImageError}/>
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Seasonal Animes</h2>
        <div className={styles.animeList}>
          {seasonalAnimes.map((anime) => (
            <div key={anime.mal_id} className={styles.animeItem} onClick={() => openModal(anime)}>
              <img src={anime.images.jpg.image_url} alt={anime.title} onError={handleImageError}/>
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Top 10 Mangas</h2>
        <div className={styles.animeList}>
          {topMangas.map((manga) => (
            <div key={manga.mal_id} className={styles.animeItem} onClick={() => openModal({...manga, type: 'manga'})}>
              <img src={manga.images.jpg.image_url} alt={manga.title} onError={handleImageError}/>
              <p>{manga.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}