// src/pages/ShowDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * ShowDetailPage Component
 *
 * Displays detailed information about a specific podcast show, including
 * its image, title, description, last updated date, and a collapsible list
 * of seasons and episodes.
 *
 * Fetches show data dynamically from the external API using the show ID
 * provided via route parameters.
 *
 * @component
 * @returns {JSX.Element} The rendered show detail page
 */
export default function ShowDetailPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(null);

  useEffect(() => {
    async function fetchShowDetails() {
      try {
        setLoading(true);
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) throw new Error("Failed to fetch show details");
        const data = await response.json();
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
  if (!show) return <p>No show found.</p>;

  return (
    <div className="show-detail" style={{ textAlign: "center", padding: "1rem" }}>
      <Link to="/">← Back to Home</Link>
      <h1 style={{ color: "black" }}>{show.title}</h1>
      <img
        src={show.image}
        alt={show.title}
        style={{ width: "300px", borderRadius: "10px", marginBottom: "1rem" }}
      />
      <p>{show.description}</p>
      <p>
        <strong>Last updated:</strong> {new Date(show.updated).toLocaleDateString()}
      </p>

      <h2 style={{ color: "purple" }}>Seasons</h2>

      {show.seasons && show.seasons.length > 0 ? (
        show.seasons.map((season) => (
          <div
            key={season.id}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <h3
              onClick={() =>
                setExpandedSeason(expandedSeason === season.id ? null : season.id)
              }
              style={{
                cursor: "pointer",
                color: "purple",
                margin: 0,
                userSelect: "none",
              }}
            >
              {season.title} ({season.episodes.length} episodes)
            </h3>

            {expandedSeason === season.id && (
              <div className="episodes" style={{ marginTop: "0.5rem", textAlign: "left" }}>
                {season.episodes.map((episode, index) => (
                  <div
                    key={episode.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={season.image}
                      alt={`Season ${season.title}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <div>
                      <h4 style={{ color: "purple", margin: "0 0 0.25rem 0" }}>
                        Episode {index + 1}: {episode.title}
                      </h4>
                      <p style={{ margin: 0 }}>
                        {episode.description.length > 100
                          ? episode.description.slice(0, 100) + "..."
                          : episode.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p style={{ fontStyle: "italic", color: "#666" }}>No seasons available.</p>
      )}
    </div>
  );
}


