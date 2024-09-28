import React, { useState, useEffect } from 'react';
import { MapPin, Loader, Search } from 'lucide-react';

const grihaPlaces = [
  { name: "Pharmacy", types: ["pharmacy", "drugstore"] },
  { name: "Hospitals", types: ["doctor", "hospital"] },
  { name: "Other Medical Facilities", types: ["physiotherapist", "dentist", "veterinary_care"] },
  { name: "Primary School", types: ["primary_school"] },
  { name: "Secondary School", types: ["secondary_school"] },
  { name: "University", types: ["university", "school"] },
  { name: "Community Centre", types: ["community_center"] },
  { name: "Art Gallery", types: ["art_gallery"] },
  { name: "Movie Theatre", types: ["movie_theater"] },
  { name: "Convenience Store", types: ["convenience_store", "supermarket", "store"] },
  { name: "Gas Station", types: ["gas_station"] },
  { name: "Restaurant", types: ["restaurant", "cafe"] },
  { name: "Gym", types: ["gym"] },
  { name: "Park", types: ["park"] },
  { name: "Bus Station", types: ["bus_station"] },
  { name: "Subway Station", types: ["subway_station", "light_rail_station"] },
  { name: "Transit Station", types: ["transit_station", "train_station"] },
  { name: "ATM", types: ["atm"] },
  { name: "Bank", types: ["bank"] },
  { name: "Church", types: ["church"] },
  { name: "Mosque", types: ["mosque"] },
  { name: "Hindu Temple", types: ["hindu_temple"] },
  { name: "Synagogue", types: ["synagogue"] },
  { name: "Government Building", types: ["city_hall", "courthouse", "fire_station", "police", "post_office", "local_government_office", "embassy"] },
];

const priorityServices = {
  healthcare: ["pharmacy", "doctor", "hospital", "drugstore"],
  education: ["primary_school", "secondary_school", "university", "school"],
  distribution: ["convenience_store", "supermarket", "store", "gas_station"],
  publicTransit: ["bus_station", "subway_station", "transit_station", "train_station"],
  publicServiceOffice: ["city_hall", "courthouse", "fire_station", "police", "post_office", "local_government_office", "embassy"],
  sportsAndRecreation: ["gym", "park"],
  socioCultural: ["community_center", "art_gallery", "movie_theater"],
  religiousFacilities: ["church", "mosque", "hindu_temple", "synagogue"],
  bankingFacilities: ["atm", "bank"],
};

const Location = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [grihaScore, setGrihaScore] = useState(null);
  const [grihaBreakdown, setGrihaBreakdown] = useState('');

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setLocation(prevState => ({ ...prevState, address: data.display_name }));
            calculateGrihaScore({ lat: latitude, lng: longitude });
          } catch (error) {
            console.error("Error fetching address:", error);
          }
          setLoading(false);
        },
        (error) => {
          setError("Error getting location: " + error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  const searchNearbyPlaces = async () => {
    if (!location) {
      setError("Please get your location first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&lat=${location.latitude}&lon=${location.longitude}&limit=5`);
      const data = await response.json();
      setNearbyPlaces(data);
    } catch (error) {
      setError("Error searching for nearby places");
      console.error("Error fetching nearby places:", error);
    }

    setLoading(false);
  };

  const calculateGrihaScore = (location) => {
    let grihaScore = 0;
    let scoreBreakdown = "";
    let counts = {
      lessThan375m: 0,
      between375mAnd400m: 0,
    };
    const closestPlaces = {};
    const exclusionThreshold = 0.05; 
    const getCategoryName = (types) => {
      for (const [category, serviceTypes] of Object.entries(priorityServices)) {
        if (types.some(type => serviceTypes.includes(type))) {
          return category;
        }
      }
      return null;
    };

    const formatCategoryName = (name) => {
      return name.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/_/g, ' ');
    };

    grihaPlaces.forEach((place) => {
      const simulatedResults = [
        { 
          name: `Simulated ${place.name}`,
          geometry: { 
            location: { 
              lat: () => location.lat + (Math.random() - 0.5) * 0.01,
              lng: () => location.lng + (Math.random() - 0.5) * 0.01
            }
          }
        }
      ];

      const closestPlace = simulatedResults[0];
      const distance = calculateDistance(
        { latitude: location.lat, longitude: location.lng },
        { latitude: closestPlace.geometry.location.lat(), longitude: closestPlace.geometry.location.lng() }
      );

      if (distance > exclusionThreshold) {
        const categoryName = getCategoryName(place.types);
        if (categoryName) {
          if (!closestPlaces[categoryName] || closestPlaces[categoryName].distance > distance) {
            closestPlaces[categoryName] = {
              name: closestPlace.name,
              distance: distance,
            };
          }

          if (distance < 0.375) {
            counts.lessThan375m++;
          } else if (distance <= 0.4) {
            counts.between375mAnd400m++;
          }
        }
      }
    });

    if (counts.lessThan375m >= 5) {
      grihaScore = 2;
    } else if (counts.between375mAnd400m >= 5) {
      grihaScore = 1;
    }

    scoreBreakdown = Object.entries(closestPlaces).map(([category, data]) => {
      return `${formatCategoryName(category)}: ${data.name}\nDistance: ${data.distance.toFixed(2)} km\n`;
    }).join("\n");

    setGrihaScore(grihaScore);
    setGrihaBreakdown(scoreBreakdown);
  };

  return (
    <div className="w-screen min-h-screen text-white flex flex-col items-center p-4 font-Poppins bg-green-500 ">
      <h1 className="text-3xl text-center mb-4">
        Get Location, Find Nearby Places, and Calculate GRIHA Score
      </h1>
      <button
        onClick={getLocation}
        className="h-20 w-44 p-2 bg-blue-600 text-white font-bold  hover:bg-yellow-600 transition-colors flex items-center justify-center mb-4 rounded-full"
        disabled={loading}
      >
        {loading ? (
          <Loader className="animate-spin mr-2" />
        ) : (
          <MapPin className="mr-2" />
        )}
        {loading ? 'Getting Location...' : 'Get Location'}
      </button>
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
      {location && (
        <div className="mt-4 text-center text-white font-Poppins">
          <h2 className="text-xl font-bold">Your Current Location:</h2>
          <p>Latitude: {location.latitude.toFixed(6)}</p>
          <p>Longitude: {location.longitude.toFixed(6)}</p>
          {location.address && <p>Address: {location.address}</p>}
          <div className="mt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for nearby places"
              className="p-2 border border-gray-300  mr-2 rounded-3xl text-black"
            />
            <button
              onClick={searchNearbyPlaces}
              className="p-2 bg-blue-500 text-white font-bold  hover:bg-blue-600 transition-colors rounded-full"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin inline mr-2" />
              ) : (
                <Search className="inline mr-2" />
              )}
            
            </button>
          </div>
        </div>
      )}
      {nearbyPlaces.length > 0 && (
        <div className="mt-4 text-black">
          <h3 className="text-xl font-bold">Nearby Places:</h3>
          <ul className="list-disc pl-5">
            {nearbyPlaces.map((place, index) => (
              <li key={index}>
                {place.display_name} 
                <br/>
                (Approx. {calculateDistance(location, {latitude: parseFloat(place.lat), longitude: parseFloat(place.lon)}).toFixed(2)} km away)
              </li>
            ))}
          </ul>
        </div>
      )}
      {grihaScore !== null && (
        <div className="mt-4 text-black border-2 border-solid p-4 bg-red-500 font-Poppins">
          <h3 className="text-xl font-bold">GRIHA Score:</h3>
          <p>Total GRIHA Score: {grihaScore}</p>
          <h4 className="text-lg font-semibold mt-2">Score Breakdown:</h4>
          <pre className="text-left whitespace-pre-wrap">{grihaBreakdown}</pre>
        </div>
      )}
    </div>
  );
};

function calculateDistance(point1, point2) {
  const R = 6371; 
  const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
  const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

export default Location;