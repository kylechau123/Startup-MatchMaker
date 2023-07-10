import React, { useEffect, useState } from "react";
import axios from "axios";
import StartupCard from '../StartupCard';


const StartupList = () => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    // Fetch startups from the API and set them to state
    axios.get("/api/startups").then((response) => {
      setStartups(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Startup List</h2>
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
};

export default StartupList;