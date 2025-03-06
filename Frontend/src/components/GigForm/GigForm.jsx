import React, { useState, useEffect } from "react";
import { TextField, Box, Button, Typography, Alert } from "@mui/material";

const GigForm = () => {
  const [formData, setFormData] = useState({
    gigTitle: "",
    gigDate: "",
    gigDescription: "",
    location: "",
  });

  const [submitResult, setSubmitResult] = useState(""); // For displaying the result of the submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/gigs/postGig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to post gig");
      }

      const data = await response.json();
      console.log("Gig created:", formData);
      setSubmitResult("Gig posted successfully!");

      // Reset the form after successful submission
      setFormData({
        gigTitle: "",
        gigDate: "",
        gigDescription: "",
        location: "",
      });
    } catch (error) {
      console.error("Error creating gig:", error);
      setSubmitResult("Failed to post gig");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        border: "2px solid #ff7b00",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: "black" }}>
        Create a Gig
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Gig Title"
          variant="outlined"
          fullWidth
          name="gigTitle"
          value={formData.gigTitle}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Gig Date"
          variant="outlined"
          fullWidth
          type="date"
          name="gigDate"
          value={formData.gigDate}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="gigDescription"
          value={formData.gigDescription}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#ff7b00" }}
        >
          Post Gig
        </Button>
      </form>

      {submitResult && (
        <Alert
          severity={submitResult === "Gig posted successfully!" ? "success" : "error"}
          sx={{ mt: 2 }}
        >
          {submitResult}
        </Alert>
      )}
    </Box>
  );
};

export default GigForm;

