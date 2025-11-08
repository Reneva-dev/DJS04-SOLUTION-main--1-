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
    <div className="show-detail">
      <Link to="/">← Back to Home</Link>

      {/* Podcast Title */}
      <h1 style={{ color: "var(--black)", marginBottom: "1rem" }}>{show.title}</h1>

      {/* Podcast Image */}
      <img
        src={show.image}
        alt={show.title}
        style={{ width: "300px", borderRadius: "10px", marginBottom: "1rem" }}
      />

      {/* Description */}
      <p>{show.description}</p>

      {/* Last Updated */}
      <p>
        <strong>Last updated:</strong> {new Date(show.updated).toLocaleDateString()}
      </p>

      {/* Seasons Heading */}
      <h2 style={{ color: "var(--lavender-purple)", marginTop: "2rem" }}>Seasons</h2>

      {/* Seasons List */}
      {show.seasons && show.seasons.length > 0 ? (
        show.seasons.map((season) => {
          const episodeCount = season.episodes ? season.episodes.length : 0;
          return (
            <div
              key={`season-${season.season}`}
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
                  setExpandedSeason(expandedSeason === season.season ? null : season.season)
                }
                style={{
                  cursor: "pointer",
                  color: "var(--lavender-purple)",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  margin: 0,
                }}
              >
                {season.title} ({episodeCount} episodes)
              </h3>

              {expandedSeason === season.season && (
                <div className="episodes" style={{ marginTop: "1rem" }}>
                  {season.episodes && season.episodes.length > 0 ? (
                    season.episodes.map((episode) => (
                      <div
                        key={`episode-${episode.episode}`}
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
                          <h4>
                            Episode {episode.episode}: {episode.title}
                          </h4>
                          <p>
                            {episode.description
                              ? episode.description.length > 100
                                ? episode.description.slice(0, 100) + "..."
                                : episode.description
                              : "No description available."}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontStyle: "italic", color: "#666" }}>
                      No episodes available for this season.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No seasons available.</p>
      )}
    </div>
  );
}



