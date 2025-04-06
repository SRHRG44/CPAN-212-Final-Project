"use client";
import { useState, useEffect } from "react";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Manga() {
  const [mangaList, setMangaList] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (letter, page = 1, retryCount = 0) => {
      try {
        let apiUrl = `https://api.jikan.moe/v4/manga?limit=25&page=${page}`;
        if (letter) {
          apiUrl += `&letter=${letter}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          if (response.status === 429 && retryCount < 3) {
            // Retry with exponential backoff
            const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
            console.warn(`Rate limit exceeded. Retrying in ${delay / 1000}s...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            await fetchData(letter, page, retryCount + 1); // Recursive call with retryCount incremented
            return;
          }

          console.error(`API Error: ${response.status} ${response.statusText}`);
          setMangaList([]);
          return;
        }

        const data = await response.json();

        if (data && data.data && Array.isArray(data.data)) {
          let mangaData = data.data.map((item) => ({
            id: item.mal_id,
            title: item.title,
          }));

          setMangaList((prevList) => [...prevList, ...mangaData]);

          if (data.pagination.has_next_page) {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500ms
            await fetchData(letter, page + 1);
          }
        } else {
          console.error("API response is missing data:", data);
          setMangaList([]);
        }
      } catch (error) {
        console.error("Error fetching manga data:", error);
        setMangaList([]);
      }
    };

    setMangaList([]);
    if (selectedLetter) {
      fetchData(selectedLetter);
    } else {
      fetchData();
    }
  }, [selectedLetter]);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleMangaClick = (id) => {
    router.push(`/manga/${id}`);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className={styles.mangaContainer}>
      <h1>Manga (Alphabetical Order)</h1>

      <div className={styles.letterButtons}>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={styles.letterButton}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className={styles.mangaList}>
        {mangaList.map((manga) => (
          <div
            key={manga.id}
            className={styles.mangaItem}
            onClick={() => handleMangaClick(manga.id)}
          >
            {manga.title}
          </div>
        ))}
      </div>
    </div>
  );
}