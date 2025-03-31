import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anime Infotainment",
  description: "Your anime and manga information hub.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <header style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>One stop Anime & Manga</span>
            <br></br>
            <Navbar />
          </div>
        </header>
        <main style={{ flex: 1 }}>{children}</main>
        <footer style={{ position: 'relative', zIndex: 1 }}>One stop Anime & Manga</footer>
      </body>
    </html>
  );
}

