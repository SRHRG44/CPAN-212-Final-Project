"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import styles from './manga.module.css';

export default function MangaDetailsPage() {
  const [mangaDetails, setMangaDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        setMangaDetails(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!mangaDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h1>{mangaDetails.title}</h1>
      <img src={mangaDetails.images.jpg.large_image_url || mangaDetails.images.jpg.image_url} alt={mangaDetails.title} />

      {mangaDetails.title_english && <p>English Title: {mangaDetails.title_english}</p>}
      {mangaDetails.title_japanese && <p>Japanese Title: {mangaDetails.title_japanese}</p>}
      {mangaDetails.title_synonyms && <p>Synonyms: {mangaDetails.title_synonyms.join(', ')}</p>}
      {mangaDetails.type && <p>Type: {mangaDetails.type}</p>}
      {mangaDetails.source && <p>Source: {mangaDetails.source}</p>}
      {mangaDetails.chapters && <p>Chapters: {mangaDetails.chapters}</p>}
      {mangaDetails.volumes && <p>Volumes: {mangaDetails.volumes}</p>}
      {mangaDetails.status && <p>Status: {mangaDetails.status}</p>}
      {mangaDetails.published && <p>Published: {mangaDetails.published.string}</p>}
      {mangaDetails.score && <p>Score: {mangaDetails.score}</p>}
      {mangaDetails.scored_by && <p>Scored By: {mangaDetails.scored_by}</p>}
      {mangaDetails.rank && <p>Rank: {mangaDetails.rank}</p>}
      {mangaDetails.popularity && <p>Popularity: {mangaDetails.popularity}</p>}
      {mangaDetails.members && <p>Members: {mangaDetails.members}</p>}
      {mangaDetails.favorites && <p>Favorites: {mangaDetails.favorites}</p>}
      {mangaDetails.synopsis && <p>Synopsis: {mangaDetails.synopsis}</p>}
      {mangaDetails.background && <p>Background: {mangaDetails.background}</p>}

      {mangaDetails.authors && mangaDetails.authors.length > 0 && (
        <div>
          <h3>Authors:</h3>
          <ul>
            {mangaDetails.authors.map((author) => (
              <li key={author.mal_id}>
                <a href={author.url} target="_blank" rel="noopener noreferrer">{author.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mangaDetails.serializations && mangaDetails.serializations.length > 0 && (
        <div>
          <h3>Serializations:</h3>
          <ul>
            {mangaDetails.serializations.map((serialization) => (
              <li key={serialization.mal_id}>
                <a href={serialization.url} target="_blank" rel="noopener noreferrer">{serialization.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mangaDetails.genres && mangaDetails.genres.length > 0 && (
        <div>
          <h3>Genres:</h3>
          <ul>
            {mangaDetails.genres.map((genre) => (
              <li key={genre.mal_id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}

      {mangaDetails.themes && mangaDetails.themes.length > 0 && (
        <div>
          <h3>Themes:</h3>
          <ul>
            {mangaDetails.themes.map((theme) => (
              <li key={theme.mal_id}>{theme.name}</li>
            ))}
          </ul>
        </div>
      )}

      {mangaDetails.demographics && mangaDetails.demographics.length > 0 && (
        <div>
          <h3>Demographics:</h3>
          <ul>
            {mangaDetails.demographics.map((demographic) => (
              <li key={demographic.mal_id}>{demographic.name}</li>
            ))}
          </ul>
        </div>
      )}

      {mangaDetails.relations && mangaDetails.relations.length > 0 && (
        <div>
          <h3>Relations:</h3>
          {mangaDetails.relations.map((relation) => (
            <div key={relation.relation}>
              <h4>{relation.relation}</h4>
              <ul>
                {relation.entry.map((entry) => (
                  <li key={entry.mal_id}>
                    <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.name} ({entry.type})</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {mangaDetails.external && mangaDetails.external.length > 0 && (
        <div>
          <h3>External Links:</h3>
          <ul>
            {mangaDetails.external.map((external) => (
              <li key={external.name}>
                <a href={external.url} target="_blank" rel="noopener noreferrer">{external.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}