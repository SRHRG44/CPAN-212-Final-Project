"use client";
import { useState, useEffect, useRef } from "react";
import styles from './manga.module.css';

export default function Manga() {
  const [mangaList, setMangaList] = useState([]);
  const letterRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/manga?limit=500");
        const data = await response.json();
        const mangaData = data.data.map((item) => ({
          id: item.mal_id,
          title: item.title,
          letter: item.title.charAt(0).toUpperCase(),
        }));
        const sortedManga = mangaData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setMangaList(sortedManga);
      } catch (error) {
        console.error("Error fetching manga data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLetterClick = (letter) => {
    if (letterRefs.current[letter]) {
      letterRefs.current[letter].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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

      <div className={styles.mangaGroups}>
        {alphabet.map((letter) => (
          <div key={letter} ref={(el) => (letterRefs.current[letter] = el)} className={styles.mangaGroup}>
            <h2 className={styles.letterHeader}>{letter}</h2>
            <ul className={styles.mangaList}>
              {mangaList
                .filter((manga) => manga.letter === letter)
                .map((manga) => (
                  <li key={manga.id} className={styles.mangaItem}>{manga.title}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}