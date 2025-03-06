import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import venuesData from "../VenuesData/VenuesData"; 

export default function VenueSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [results, setResults] = useState([]);

  const uniqueStates = [...new Set(venuesData.map((venue) => venue.state))];

  const handleSearch = () => {
    const filteredVenues = venuesData.filter((venue) =>
      (venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venue.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedState === "" || venue.state === selectedState)
    );
    setResults(filteredVenues);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", border: "2px solid #ff7b00", backgroundColor: "white" }}>
      {/* Search Input */}
      <TextField
        label="Search Concert Venues"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* State Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select State</InputLabel>
        <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <MenuItem value="">All States</MenuItem>
          {uniqueStates.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Search Button */}
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginBottom: 2 }}>
        Search
      </Button>

      {/* Display Results */}
      {results.length > 0 ? (
        results.map((venue, index) => (
          <Card key={index} sx={{ marginBottom: 2, textAlign: "left", maxHeight:'500px'}}>
            <CardContent>
              <Typography variant="h6">{venue.name}</Typography>
              <Typography variant="body2">📍 {venue.location}</Typography>
              <Typography variant="body2">📞 {venue.contact}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        searchTerm && <Typography>No results found.</Typography>
      )}
    </div>
  );
}