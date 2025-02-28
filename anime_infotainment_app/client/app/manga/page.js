"use client";
import { useState, useEffect, useRef } from "react";

export default function Manga() {
  const [mangaList, setMangaList] = useState([]);
  const letterRefs = useRef({});

  useEffect(() => {
    // Simulate fetching manga data from an API or database
    // Replace with your actual data fetching logic
    const dummyManga = [
      { id: 1, title: "Attack on Titan", letter: "A" },
      { id: 2, title: "Berserk", letter: "B" },
      { id: 3, title: "Code Geass", letter: "C" },
      { id: 4, title: "Death Note", letter: "D" },
      { id: 5, title: "Erased", letter: "E" },
      { id: 6, title: "Fairy Tail", letter: "F" },
      { id: 7, title: "Gintama", letter: "G" },
      { id: 8, title: "Haikyu!!", letter: "H" },
      { id: 9, title: "Inuyasha", letter: "I" },
      { id: 10, title: "Jujutsu Kaisen", letter: "J" },
      // ... more manga
    ];

    // Sort manga alphabetically
    const sortedManga = dummyManga.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setMangaList(sortedManga);
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
    <div>
      <h1>Manga (Alphabetical Order)</h1>

      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            style={{ margin: "5px", padding: "5px 10px", cursor: "pointer" }}
          >
            {letter}
          </button>
        ))}
      </div>

      <div>
        {alphabet.map((letter) => (
          <div key={letter} ref={(el) => (letterRefs.current[letter] = el)}>
            <h2>{letter}</h2>
            <ul>
              {mangaList
                .filter((manga) => manga.letter === letter)
                .map((manga) => (
                  <li key={manga.id}>{manga.title}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
