import React from "react";
import { useUserContext } from "../context/UserContext";
import Sidebar from "../components/Dashboard/Sidebar";
import GreetingCard from "../components/Dashboard/GreetingCard";
import VenueSearch from "../components/Dashboard/VenueSearch";
import Calendar from "../components/Dashboard/Calendar";
import '../styles/DashboardStyles.css'
import GoogleMapDirections from "../components/Dashboard/GoogleMap";

const Dashboard = () => {
  const { currentUser } = useUserContext();

  console.log("Current User:", currentUser); // Debugging Log
  console.log(currentUser.name)
  return (
    <div className="Dashboard">
      <div className='dashboard-content'>   
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="greeting-search-section">
        <div className='greeting'>
          {/* Display Greeting */}
            {currentUser ? (
            <GreetingCard userName={currentUser.name || currentUser.email} />
          ) : (
          <p>Loading user data...</p>
        )}
        </div>
        <div className='venue-search'>
          {/* Display Venue Search */}
          <VenueSearch />
        </div>
        </div>
        <div className='google-section'>
        <div className='calendar'>
          <Calendar/>
        </div>
      </div>
      <div className='google-map'>
          <GoogleMapDirections/>
        </div>
        </div>
    </div>
  );
};

export default Dashboard;
