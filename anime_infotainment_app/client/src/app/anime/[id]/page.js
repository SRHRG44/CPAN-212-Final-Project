"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import styles from './anime.module.css';

export default function AnimeDetailsPage() {
  const [animeDetails, setAnimeDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        setAnimeDetails(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!animeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h1>{animeDetails.title}</h1>
      <img src={animeDetails.images.jpg.large_image_url || animeDetails.images.jpg.image_url} alt={animeDetails.title} />

      {animeDetails.title_english && <p>English Title: {animeDetails.title_english}</p>}
      {animeDetails.title_japanese && <p>Japanese Title: {animeDetails.title_japanese}</p>}
      {animeDetails.title_synonyms && <p>Synonyms: {animeDetails.title_synonyms.join(', ')}</p>}
      {animeDetails.type && <p>Type: {animeDetails.type}</p>}
      {animeDetails.source && <p>Source: {animeDetails.source}</p>}
      {animeDetails.episodes && <p>Episodes: {animeDetails.episodes}</p>}
      {animeDetails.status && <p>Status: {animeDetails.status}</p>}
      {animeDetails.aired && <p>Aired: {animeDetails.aired.string}</p>}
      {animeDetails.duration && <p>Duration: {animeDetails.duration}</p>}
      {animeDetails.rating && <p>Rating: {animeDetails.rating}</p>}
      {animeDetails.score && <p>Score: {animeDetails.score}</p>}
      {animeDetails.scored_by && <p>Scored By: {animeDetails.scored_by}</p>}
      {animeDetails.rank && <p>Rank: {animeDetails.rank}</p>}
      {animeDetails.popularity && <p>Popularity: {animeDetails.popularity}</p>}
      {animeDetails.members && <p>Members: {animeDetails.members}</p>}
      {animeDetails.favorites && <p>Favorites: {animeDetails.favorites}</p>}
      {animeDetails.synopsis && <p>Synopsis: {animeDetails.synopsis}</p>}
      {animeDetails.background && <p>Background: {animeDetails.background}</p>}
      {animeDetails.season && <p>Season: {animeDetails.season}</p>}
      {animeDetails.year && <p>Year: {animeDetails.year}</p>}
      {animeDetails.broadcast && <p>Broadcast: {animeDetails.broadcast.string}</p>}

      {animeDetails.producers && animeDetails.producers.length > 0 && (
        <div>
          <h3>Producers:</h3>
          <ul>
            {animeDetails.producers.map((producer) => (
              <li key={producer.mal_id}>
                <a href={producer.url} target="_blank" rel="noopener noreferrer">{producer.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.licensors && animeDetails.licensors.length > 0 && (
        <div>
          <h3>Licensors:</h3>
          <ul>
            {animeDetails.licensors.map((licensor) => (
              <li key={licensor.mal_id}>
                <a href={licensor.url} target="_blank" rel="noopener noreferrer">{licensor.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.studios && animeDetails.studios.length > 0 && (
        <div>
          <h3>Studios:</h3>
          <ul>
            {animeDetails.studios.map((studio) => (
              <li key={studio.mal_id}>
                <a href={studio.url} target="_blank" rel="noopener noreferrer">{studio.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.genres && animeDetails.genres.length > 0 && (
        <div>
          <h3>Genres:</h3>
          <ul>
            {animeDetails.genres.map((genre) => (
              <li key={genre.mal_id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.themes && animeDetails.themes.length > 0 && (
        <div>
          <h3>Themes:</h3>
          <ul>
            {animeDetails.themes.map((theme) => (
              <li key={theme.mal_id}>{theme.name}</li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.demographics && animeDetails.demographics.length > 0 && (
        <div>
          <h3>Demographics:</h3>
          <ul>
            {animeDetails.demographics.map((demographic) => (
              <li key={demographic.mal_id}>{demographic.name}</li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.relations && animeDetails.relations.length > 0 && (
        <div>
          <h3>Relations:</h3>
          {animeDetails.relations.map((relation) => (
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

      {animeDetails.theme && animeDetails.theme.openings && animeDetails.theme.openings.length > 0 && (
        <div>
          <h3>Openings:</h3>
          <ul>
            {animeDetails.theme.openings.map((opening, index) => (
              <li key={index}>{opening}</li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.theme && animeDetails.theme.endings && animeDetails.theme.endings.length > 0 && (
        <div>
          <h3>Endings:</h3>
          <ul>
            {animeDetails.theme.endings.map((ending, index) => (
              <li key={index}>{ending}</li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.external && animeDetails.external.length > 0 && (
        <div>
          <h3>External Links:</h3>
          <ul>
            {animeDetails.external.map((external) => (
              <li key={external.name}>
                <a href={external.url} target="_blank" rel="noopener noreferrer">{external.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.streaming && animeDetails.streaming.length > 0 && (
        <div>
          <h3>Streaming Links:</h3>
          <ul>
            {animeDetails.streaming.map((streaming) => (
              <li key={streaming.name}>
                <a href={streaming.url} target="_blank" rel="noopener noreferrer">{streaming.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {animeDetails.trailer && animeDetails.trailer.embed_url && (
        <div>
          <h3>Trailer:</h3>
          <iframe
            width="560"
            height="315"
            src={animeDetails.trailer.embed_url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}