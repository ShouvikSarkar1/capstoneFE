import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { useUserContext } from "../../context/UserContext";


export default function GreetingCard({ userName, profilePicture }) {
    // Extract username from email
    const displayName = userName.includes("@") ? userName.split("@")[0] : userName;
    return (
      <Card sx={{ minWidth: 290, p: 2, textAlign: "center", boxShadow: 3, border: "2px solid #ff7b00" }}>
        <CardContent>
          <Avatar 
            src={profilePicture} 
            alt="Profile Picture" 
            sx={{ width: 80, height: 80, margin: "0 auto", border: "2px solid #ff7b00"}} 
          />
          <Typography variant="h5" component="div" sx={{ mt: 2 }}>
            Welcome, {displayName}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hope you have a great time exploring your dashboard.
          </Typography>
        </CardContent>
      </Card>
    );
  }
