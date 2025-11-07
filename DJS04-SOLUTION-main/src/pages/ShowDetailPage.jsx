// src/pages/ShowDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPodcasts } from "../api/fetchPodcasts.js";


export default function ShowDetailPage() {
  const { id } = useParams(); // dynamic part of the URL (/show/:id)
  const [show, setShow] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPodcasts();
      const found = data.find((podcast) => podcast.id === parseInt(id));
      setShow(found);
    }
    loadData();
  }, [id]);

  if (!show) return <p>Loading...</p>;

  return (
    <div className="show-detail">
      <Link to="/">← Back to Home</Link>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} />
      <p>{show.description}</p>
    </div>
  );
}
