import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // 🧭 added for nested routes
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";
import Header from "./components/Header";
import styles from "./App.module.css";

/**
 * Root layout component of the Podcast Explorer app.
 * Provides global context and structure for all pages.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <Header />

      <PodcastProvider initialPodcasts={podcasts}>
        <main className={styles.main}>
          {/* Show loading or error globally */}
          {loading && (
            <div className={styles.messageContainer}>
              <div className={styles.spinner}></div>
              <p>Loading podcasts...</p>
            </div>
          )}

          {error && (
            <div className={styles.message}>
              <div className={styles.error}>
                Error occurred while fetching podcasts: {error}
              </div>
            </div>
          )}

          {/* Render the active page (HomePage or ShowDetailPage) */}
          {!loading && !error && <Outlet />}
        </main>
      </PodcastProvider>
    </>
  );
}
