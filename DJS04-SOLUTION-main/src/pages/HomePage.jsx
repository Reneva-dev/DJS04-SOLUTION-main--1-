// src/pages/HomePage.jsx
import React, { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext.jsx";
import { genres } from "../data";
import SearchBar from "../components/SearchBar.jsx";
import GenreFilter from "../components/GenreFilter.jsx";
import SortSelect from "../components/SortSelect.jsx";
import PodcastGrid from "../components/PodcastGrid.jsx";

/**
 * HomePage Component
 *
 * Displays the main list of podcasts, including search, filter, and sorting controls.
 * Uses data from the global PodcastContext to manage the list of available and
 * filtered podcasts.
 *
 * @component
 * @returns {JSX.Element} The rendered homepage with podcast grid and controls
 */

export default function HomePage() {
  const { podcasts, filteredPodcasts } = useContext(PodcastContext);

  return (
    <div className="homepage">
      <h1>Podcasts</h1>
      <SearchBar />
      <GenreFilter genres={genres} />
      <SortSelect />
      <PodcastGrid podcasts={filteredPodcasts || podcasts} genres={genres} />
    </div>
  );
}
