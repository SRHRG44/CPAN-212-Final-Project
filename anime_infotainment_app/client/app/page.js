"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';

export default function Home() {
  const [top10Animes, setTop10Animes] = useState([]);
  const [seasonalAnimes, setSeasonalAnimes] = useState([]);
  const [top10Mangas, setTop10Mangas] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const CLIENT_ID = process.env.MAL_CLIENT_ID;
  const CLIENT_SECRET = process.env.MAL_CLIENT_SECRET; // Insecure! For demo only!
  const REDIRECT_URI = "http://localhost:3000/"; // Adjust as needed
  const CODE_VERIFIER = generateCodeVerifier();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && !accessToken) {
      fetchAccessToken(code);
    } else {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        authorizeUser();
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      fetchData();
    }
  }, [accessToken]);

  const authorizeUser = () => {
    const codeChallenge = CODE_VERIFIER; // MAL uses plain
    const authUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${codeChallenge}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch("https://myanimelist.net/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET, // Insecure! For demo only!
          code: code,
          code_verifier: CODE_VERIFIER,
          redirect_uri: REDIRECT_URI,
        }),
      });
      const data = await response.json();
      setAccessToken(data.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const fetchData = async () => {
    try {
      const animeRankingResponse = await fetch(
        "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=10&fields=title,main_picture",
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const animeRankingData = await animeRankingResponse.json();
      setTop10Animes(animeRankingData.data.map((item) => item.node));

      const seasonalAnimeResponse = await fetch(
        "https://api.myanimelist.net/v2/anime/season/2024/spring?limit=10&fields=title,main_picture",
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const seasonalAnimeData = await seasonalAnimeResponse.json();
      setSeasonalAnimes(seasonalAnimeData.data.map((item) => item.node));

      const mangaRankingResponse = await fetch(
        "https://api.myanimelist.net/v2/manga/ranking?ranking_type=manga&limit=10&fields=title,main_picture",
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const mangaRankingData = await mangaRankingResponse.json();
      setTop10Mangas(mangaRankingData.data.map((item) => item.node));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function generateCodeVerifier() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const charactersLength = characters.length;
    for (let i = 0; i < 128; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


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
