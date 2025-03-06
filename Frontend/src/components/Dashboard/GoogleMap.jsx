import React, { useEffect, useRef, useState } from "react";

const GoogleMapDirections = () => {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const startInputRef = useRef(null);
  const destInputRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;

    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.0522, lng: -118.2437 },
        zoom: 7,
      });

      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
      directionsRendererInstance.setMap(map);

      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);

      // Enable Places Autocomplete for input fields
      const startAutocomplete = new window.google.maps.places.Autocomplete(startInputRef.current);
      const destAutocomplete = new window.google.maps.places.Autocomplete(destInputRef.current);

      // Listen for place selection and update state with place details
      startAutocomplete.addListener("place_changed", () => {
        const place = startAutocomplete.getPlace();
        if (!place.geometry) {
          alert("Invalid starting location");
          return;
        }
        setStartLocation(place.formatted_address); // Use formatted address
      });

      destAutocomplete.addListener("place_changed", () => {
        const place = destAutocomplete.getPlace();
        if (!place.geometry) {
          alert("Invalid destination");
          return;
        }
        setDestination(place.formatted_address); // Use formatted address
      });
    };

    initMap();
  }, [scriptLoaded]);

  const calculateRoute = () => {
    if (!directionsService || !directionsRenderer) {
      console.error("Google Maps API is not ready.");
      return;
    }

    if (!startLocation || !destination) {
      alert("Please enter both a starting location and a destination.");
      return;
    }

    directionsService.route(
      {
        origin: startLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
          alert("Could not find a route. Please check your locations.");
        }
      }
    );
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div className="map-controls">
        <input
          ref={startInputRef}
          type="text"
          placeholder="Enter starting location"
        />
        <input
          ref={destInputRef}
          type="text"
          placeholder="Enter destination"
        />
        <button onClick={calculateRoute}>Get Directions</button>
      </div>
      <div id="map" style={{ width: "100%", height: "500px", border: "2px solid #ff7b00" }} />
    </div>
  );
};

export default GoogleMapDirections;
