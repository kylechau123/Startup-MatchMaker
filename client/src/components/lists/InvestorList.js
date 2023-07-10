import React, { useEffect, useState } from "react";
import axios from "axios";
import InvestorCard from '../InvestorCard';


const InvestorList = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    // Fetch investors from the API and set them to state
    axios.get("/api/investors").then((response) => {
      setInvestors(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Investor List</h2>
      {investors.map((investor) => (
        <InvestorCard key={investor.id} investor={investor} />
      ))}
    </div>
  );
};

export default InvestorList;
