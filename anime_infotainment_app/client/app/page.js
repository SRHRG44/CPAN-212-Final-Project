"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';

export default function Home() {
  const [top10Animes, setTop10Animes] = useState([]);
  const [seasonalAnimes, setSeasonalAnimes] = useState([]);
  const [top10Mangas, setTop10Mangas] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const animeRankingResponse = await fetch(
          "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=10&fields=title,main_picture",
          {
            headers: {
              "X-MAL-CLIENT-ID": "CPAN-212-Final-Project",
            },
          }
        );
        const animeRankingData = await animeRankingResponse.json();
        setTop10Animes(animeRankingData.data.map((item) => item.node));

        const seasonalAnimeResponse = await fetch(
          "https://api.myanimelist.net/v2/anime/season/2024/spring?limit=10&fields=title,main_picture",
          {
            headers: {
              "X-MAL-CLIENT-ID": "YOUR_CLIENT_ID",
            },
          }
        );
        const seasonalAnimeData = await seasonalAnimeResponse.json();
        setSeasonalAnimes(seasonalAnimeData.data.map((item) => item.node));

        const mangaRankingResponse = await fetch(
          "https://api.myanimelist.net/v2/manga/ranking?ranking_type=manga&limit=10&fields=title,main_picture",
          {
            headers: {
              "X-MAL-CLIENT-ID": "YOUR_CLIENT_ID",
            },
          }
        );
        const mangaRankingData = await mangaRankingResponse.json();
        setTop10Mangas(mangaRankingData.data.map((item) => item.node));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnimes();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.section}>
        <h2>Top 10 Animes</h2>
        <div className={styles.animeList}>
          {top10Animes.map((anime) => (
            <div key={anime.id} className={styles.animeItem}>
              <img src={anime.main_picture?.medium} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Seasonal Animes</h2>
        <div className={styles.animeList}>
          {seasonalAnimes.map((anime) => (
            <div key={anime.id} className={styles.animeItem}>
              <img src={anime.main_picture?.medium} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Top 10 Mangas</h2>
        <div className={styles.animeList}>
          {top10Mangas.map((manga) => (
            <div key={manga.id} className={styles.animeItem}>
              <img src={manga.main_picture?.medium} alt={manga.title} />
              <p>{manga.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import styles from './page.module.css';

// export default function Home() {
//   const [top10Animes, setTop10Animes] = useState([]);
//   const [currentlyAiring, setCurrentlyAiring] = useState([]);
//   const [myTop5Picks, setMyTop5Picks] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data from an API or database
//     // Replace with your actual data fetching logic
//     setTop10Animes([
//       { id: 1, title: "Attack on Titan", imageUrl: "/placeholder.jpg" },
//       {
//         id: 2,
//         title: "Fullmetal Alchemist: Brotherhood",
//         imageUrl: "/placeholder.jpg",
//       },
//       { id: 3, title: "Death Note", imageUrl: "/placeholder.jpg" },
//       // ... more animes
//     ]);

//     setCurrentlyAiring([
//       {
//         id: 1,
//         title: "Demon Slayer: Kimetsu no Yaiba",
//         imageUrl: "/placeholder.jpg",
//       },
//       { id: 2, title: "Jujutsu Kaisen", imageUrl: "/placeholder.jpg" },
//       // ... more animes
//     ]);

//     setMyTop5Picks([
//       { id: 1, title: "Your Lie in April", imageUrl: "/placeholder.jpg" },
//       { id: 2, title: "Steins;Gate", imageUrl: "/placeholder.jpg" },
//       // ... more animes
//     ]);
//   }, []);

//   return (
//     <div className={styles.homeContainer}>
//       <div className={styles.section}>
//         <h2>Top 10 Animes</h2>
//         <div className={styles.animeList}>
//           {top10Animes.map((anime) => (
//             <div key={anime.id} className={styles.animeItem}>
//               <img src={anime.imageUrl} alt={anime.title} />
//               <p>{anime.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className={styles.section}>
//         <h2>Currently Airing</h2>
//         <div className={styles.animeList}>
//           {currentlyAiring.map((anime) => (
//             <div key={anime.id} className={styles.animeItem}>
//               <img src={anime.imageUrl} alt={anime.title} />
//               <p>{anime.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className={styles.section}>
//         <h2>My Top 5 Anime Picks</h2>
//         <div className={styles.animeList}>
//           {myTop5Picks.map((anime) => (
//             <div key={anime.id} className={styles.animeItem}>
//               <img src={anime.imageUrl} alt={anime.title} />
//               <p>{anime.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
