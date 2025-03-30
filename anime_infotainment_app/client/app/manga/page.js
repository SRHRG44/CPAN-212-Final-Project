"use client";
import { useState, useEffect, useRef } from "react";
import styles from './manga.module.css';

export default function Manga() {
  const [mangaList, setMangaList] = useState([]);
  const letterRefs = useRef({});
  const [accessToken, setAccessToken] = useState(null);
  const CLIENT_ID = process.env.MAL_CLIENT_ID;
  const CLIENT_SECRET = process.env.MAL_CLIENT_SECRET; // Insecure! For demo only!
  const REDIRECT_URI = "http://localhost:3000/manga"; // Adjust as needed
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
      const response = await fetch(
        "https://api.myanimelist.net/v2/manga/ranking?ranking_type=manga&limit=500&fields=title,main_picture",
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      const mangaData = data.data.map((item) => ({
        id: item.node.id,
        title: item.node.title,
        letter: item.node.title.charAt(0).toUpperCase(),
      }));
      const sortedManga = mangaData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setMangaList(sortedManga);
    } catch (error) {
      console.error("Error fetching manga data:", error);
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
// "use client";
// import { useState, useEffect, useRef } from "react";
// import styles from './manga.module.css';

// export default function Manga() {
//   const [mangaList, setMangaList] = useState([]);
//   const letterRefs = useRef({});

//   useEffect(() => {
//     // Simulate fetching manga data from an API or database
//     // Replace with your actual data fetching logic
//     const dummyManga = [
//       { id: 1, title: "Attack on Titan", letter: "A" },
//       { id: 2, title: "Berserk", letter: "B" },
//       { id: 3, title: "Code Geass", letter: "C" },
//       { id: 4, title: "Death Note", letter: "D" },
//       { id: 5, title: "Erased", letter: "E" },
//       { id: 6, title: "Fairy Tail", letter: "F" },
//       { id: 7, title: "Gintama", letter: "G" },
//       { id: 8, title: "Haikyu!!", letter: "H" },
//       { id: 9, title: "Inuyasha", letter: "I" },
//       { id: 10, title: "Jujutsu Kaisen", letter: "J" },
//       // ... more manga
//     ];

//     const sortedManga = dummyManga.sort((a, b) =>
//       a.title.localeCompare(b.title)
//     );
//     setMangaList(sortedManga);
//   }, []);

//   const handleLetterClick = (letter) => {
//     if (letterRefs.current[letter]) {
//       letterRefs.current[letter].scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   return (
//     <div className={styles.mangaContainer}>
//       <h1>Manga (Alphabetical Order)</h1>

//       <div className={styles.letterButtons}>
//         {alphabet.map((letter) => (
//           <button
//             key={letter}
//             onClick={() => handleLetterClick(letter)}
//             className={styles.letterButton}
//           >
//             {letter}
//           </button>
//         ))}
//       </div>

//       <div className={styles.mangaGroups}>
//         {alphabet.map((letter) => (
//           <div key={letter} ref={(el) => (letterRefs.current[letter] = el)} className={styles.mangaGroup}>
//             <h2 className={styles.letterHeader}>{letter}</h2>
//             <ul className={styles.mangaList}>
//               {mangaList
//                 .filter((manga) => manga.letter === letter)
//                 .map((manga) => (
//                   <li key={manga.id} className={styles.mangaItem}>{manga.title}</li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
