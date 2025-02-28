import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.section}>
        <h1>About One Stop Anime & Manga</h1>
        <br></br>
        <br></br>
        <p>
          Welcome to One Stop Anime & Manga, your ultimate destination for all things anime and manga!
        </p>
        <p>
          Our mission is to provide a comprehensive and engaging platform for fans of Japanese animation and comics.
          Whether you're a seasoned otaku or just discovering the world of anime and manga, you'll find something
          to enjoy here.
        </p>
        <p>
          We are passionate about bringing you the latest news, reviews, and updates from the anime and manga
          community. Our team is dedicated to curating high-quality content that caters to a wide range of
          interests.
        </p>
        <p>
          What you'll find on our site:
        </p>
        <ul>
          <li>Detailed manga listings.</li>
          <li>Up-to-date anime information.</li>
          <li>User profiles and community features.</li>
          <li>And much more!</li>
        </ul>
        <p>
          We strive to create a welcoming and inclusive community where fans can connect, share their passion,
          and discover new favorites.
        </p>
        <p>
          Thank you for being a part of our journey!
        </p>
        <p>
          If you have any questions or suggestions, please don't hesitate to <a href="/contact" className={styles.contactLink}>contact us</a>.
        </p>
      </div>
    </div>
  );
}