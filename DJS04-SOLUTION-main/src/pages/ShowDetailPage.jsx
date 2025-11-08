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
  const [expandedEpisode, setExpandedEpisode] = useState(null); // NEW state for expanded episode

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
    <div className="show-detail" style={{ textAlign: "center" }}>
      <Link to="/">← Back to Home</Link>
      <h1 style={{ color: "#b19cd9" }}>{show.title}</h1>
      <img
        src={show.image}
        alt={show.title}
        style={{ width: "300px", borderRadius: "10px", margin: "1rem 0" }}
      />
      <p>{show.description}</p>
      <p>
        <strong>Last updated:</strong> {new Date(show.updated).toLocaleDateString()}
      </p>

      <h2 style={{ color: "#b19cd9" }}>Seasons</h2>
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
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "left",
            }}
          >
            <h3
              onClick={() =>
                setExpandedSeason(expandedSeason === season.id ? null : season.id)
              }
              style={{
                cursor: "pointer",
                color: "#b19cd9",
                marginBottom: "0.5rem",
              }}
            >
              {season.title} ({season.episodes.length} episodes)
            </h3>

            {expandedSeason === season.id && (
              <div className="episodes">
                {season.episodes.map((episode, index) => (
                  <div
                    key={episode.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                      gap: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "0.5rem",
                    }}
                    onClick={() =>
                      setExpandedEpisode(expandedEpisode === episode.id ? null : episode.id)
                    }
                  >
                    <img
                      src={season.image}
                      alt={`Season ${season.title}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0 }}>
                        Episode {index + 1}: {episode.title}
                      </h4>
                      {expandedEpisode === episode.id ? (
                        <p>{episode.description || "No description available."}</p>
                      ) : (
                        <p style={{ margin: 0, color: "#555" }}>
                          {episode.description
                            ? episode.description.length > 100
                              ? episode.description.slice(0, 100) + "..."
                              : episode.description
                            : "No description available."}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No seasons available.</p>
      )}
    </div>
  );
}


