import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        console.log("Fetching gigs...");
        const response = await fetch("http://localhost:5000/api/gigs/");
        if (!response.ok) {
          throw new Error("Failed to fetch gigs");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log data
        
        if (data.result === 200) {
          setGigs(data.data); // Correctly setting the gigs array
        } else {
          throw new Error("No gigs found");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGigs();
  }, []);
  
  console.log("Gigs state:", gigs); // Log gigs state

  if (loading) return <p>Loading gigs...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <Container>
      <h2>Gigs List</h2>
      {gigs.length > 0 ? (
        <Grid container spacing={3}>
          {gigs.map((gig) => (
            <Grid item xs={12} sm={6} md={4} key={gig._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {gig.gigTitle}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {gig.gigDate} | {gig.location}
                  </Typography>
                  <Typography variant="body2">
                    {gig.gigDescription}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No gigs available.</p>
      )}
    </Container>
  );
};

export default GigList;
