import { TextField, Box, Alert, Button, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { useUserContext } from "../../context/UserContext";
import { MyThemeContext } from "../../context/MyThemeContext";

export default function MUIForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { handleUpdateUser } = useUserContext();  // Update context with the user info
  const { theme } = useContext(MyThemeContext);

  const maxAttempts = 3;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading
  
    // Check for basic validation
    if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
      setAttemptsCount((prev) => prev + 1);
    } else if (userPassword.length < 8) {
      setSubmitResult("Password must be at least 8 characters long");
      setAttemptsCount((prev) => prev + 1);
    } else if (!/\d/.test(userPassword)) {
      setSubmitResult("Password must contain a number");
      setAttemptsCount((prev) => prev + 1);
    } else {
      try {
        // Make the login request to the backend
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailId: userEmail, password: userPassword }),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || "Login failed");
        }
  
        // If login is successful, retrieve the user info (including business name)
        const { email, businessName } = result;
  
        setSubmitResult("Successful login.");
        handleUpdateUser({ email: userEmail, businessName: businessName });  // Update context with user info
  
        // Store user data (email and business name) in localStorage
        localStorage.setItem("user", JSON.stringify(result));
        console.log(localStorage.getItem("user"));
        setIsLoggedIn(true);
      } catch (error) {
        setSubmitResult(error.message);
        setAttemptsCount((prev) => prev + 1);  // Increment attempt count on failed login
      }
    }
  };

  if ((isLoggedIn) || attemptsCount >= maxAttempts) {
    return (
      <Box sx={{ p: 4, backgroundColor: theme.background, color: theme.foreground }}>
        {
          isLoggedIn ? (
            <>
              <Typography variant="h5" component="h2">{`Welcome ${userEmail}!`}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Business Name: {JSON.parse(localStorage.getItem("user")).businessName}</Typography>
              <Alert severity="success" sx={{ mt: 2 }}>{submitResult}</Alert>
            </>
          ) : (
            <Alert severity="error">Too many failed login attempts - form is now disabled!</Alert>
          )
        }
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "450px",
        minWidth: '450px',
        backgroundColor: theme.background,
        color: theme.foreground,
        borderRadius: '5px',
        border: "2px solid #ff7b00",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        required
        fullWidth
        type="email"
        label="Email Address"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        type="password"
        label="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#ff7b00' }}>Login</Button>
      {submitResult && (
        <Alert severity={isLoggedIn ? 'success' : 'error'} sx={{ mt: 2 }}>{submitResult}</Alert>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        {`Attempts: ${attemptsCount} of ${maxAttempts}`}
      </Typography>
    </Box>
  );
}
