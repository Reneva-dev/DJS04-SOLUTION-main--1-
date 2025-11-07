// src/pages/HomePage.jsx
import React, { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext.jsx";
import SearchBar from "../components/SearchBar.jsx";
import GenreFilter from "../components/GenreFilter.jsx";
import PodcastGrid from "../components/PodcastGrid.jsx";

export default function HomePage() {
  const { podcasts, filteredPodcasts } = useContext(PodcastContext);

  return (
    <div className="homepage">
      <h1>Podcasts</h1>
      <SearchBar />
      <GenreFilter />
      <PodcastGrid podcasts={filteredPodcasts || podcasts} />
    </div>
  );
}
