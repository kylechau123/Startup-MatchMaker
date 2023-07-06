import React from "react";
import { Card, Button } from "react-bootstrap";

const InvestorCard = ({ investor }) => (
  <Card>
    <Card.Body>
      <Card.Title>{investor.name}</Card.Title>
      <Card.Text>{investor.bio}</Card.Text>
      <Card.Subtitle>
        Investment interests: {investor.investmentInterests}
      </Card.Subtitle>
      <Button variant="primary">Contact</Button>
    </Card.Body>
  </Card>
);

export default InvestorCard;

