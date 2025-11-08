// src/pages/ShowDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * ShowDetailPage
 * Displays detailed info for a specific podcast show.
 * Handles loading and error states, and formats data for readability.
 */
export default function ShowDetailPage() {
  const { id } = useParams(); // Get show ID from URL
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShowDetails() {
      try {
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!res.ok) throw new Error("Failed to fetch show details");
        const data = await res.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchShowDetails();
  }, [id]);

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>No show details found.</p>;

  // Format last updated date
  const updatedDate = new Date(show.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="show-detail" style={{ padding: "2rem" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        ← Back to Home
      </Link>

      <h1 style={{ marginTop: "1rem" }}>{show.title}</h1>

      <img
        src={show.image}
        alt={show.title}
        style={{
          width: "300px",
          borderRadius: "10px",
          margin: "1rem 0",
        }}
      />

      <p style={{ maxWidth: "600px", lineHeight: "1.6" }}>{show.description}</p>

      <div style={{ marginTop: "1rem" }}>
        <strong>Genres: </strong>
        {show.genres && show.genres.length > 0 ? (
          show.genres.map((genre) => (
            <span
              key={genre}
              style={{
                background: "#f0f0f0",
                padding: "0.3rem 0.6rem",
                borderRadius: "5px",
                marginRight: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              {genre}
            </span>
          ))
        ) : (
          <span>No genres listed</span>
        )}
      </div>

      <p style={{ marginTop: "1rem" }}>
        <strong>Last Updated:</strong> {updatedDate}
      </p>
    </div>
  );
}

