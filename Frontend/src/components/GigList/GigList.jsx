import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import GigForm from "../GigForm/GigForm";
import '../../styles/EventStyles.css';

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gigs/");
        if (!response.ok) {
          throw new Error("Failed to fetch gigs");
        }
        const data = await response.json();
        setGigs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const addNewGig = (newGig) => {
    setGigs((prevGigs) => [newGig, ...prevGigs]); // Add new gig to the top of the list
  };

  const deleteGig = async (gigId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/gigs/${gigId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gig");
      }

      setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== gigId)); // Remove from UI
    } catch (err) {
      console.error("Failed to delete gig", err);
    }
  };

  if (loading) return <CircularProgress />; // Loading spinner when fetching gigs
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Get unique city and state values
  const uniqueCities = [...new Set(gigs.map(gig => gig.city))];
  const uniqueStates = [...new Set(gigs.map(gig => gig.state))];

  // Filter gigs based on selected city and state
  const filteredGigs = gigs.filter(gig => 
    (selectedCity === "" || gig.city === selectedCity) &&
    (selectedState === "" || gig.state === selectedState)
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Left side - GigForm */}
        <Box flex={1} minWidth="600px">
          <GigForm addNewGig={addNewGig} />
        </Box>

        {/* Right side - Gig Posts & Filters */}
        <Box flex={3}>
          {/* Filter Controls */}
          <Box display="flex" gap={2} mb={3}>
            {/* City Filter */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150, backgroundColor: "white" }}>
              <InputLabel>City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="City"
              >
                <MenuItem value="">All Cities</MenuItem>
                {uniqueCities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* State Filter */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150, backgroundColor: "white" }}>
              <InputLabel>State</InputLabel>
              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                label="State"
              >
                <MenuItem value="">All States</MenuItem>
                {uniqueStates.map(state => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Reset Filters Button */}
            <Button variant="contained" color="primary" onClick={() => {
              setSelectedCity("");
              setSelectedState("");
            }}>
              Reset Filters
            </Button>
          </Box>

          {/* Display Filtered Gigs */}
          <Grid sx={{ overflowY: "auto", maxHeight: "600px" }}>
            {filteredGigs.length > 0 ? (
              filteredGigs.map((gig) => (
                <Grid item xs={12} sm={6} md={4} key={gig._id}>
                  <Card variant="outlined" sx={{ minWidth: "200px", minHeight: "200px", padding: "5px" }}>
                    <CardContent>
                      <Typography variant="h6">{gig.gigTitle}</Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {gig.gigDate} | {gig.city}, {gig.state}
                      </Typography>
                      <Typography variant="body2">
                        {gig.gigDescription}<br /><br />
                        {gig.contactLink ? (
                          <a href={gig.contactLink} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                            Contact Link
                          </a>
                        ) : (
                          "No contact link available"
                        )}
                      </Typography>

                      {/* Delete Button */}
                      <Box mt={2}>
                        <Button variant="contained" size="small" onClick={() => deleteGig(gig._id)}>
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No gigs available.</Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default GigList;
