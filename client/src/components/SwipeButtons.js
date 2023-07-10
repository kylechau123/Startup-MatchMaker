import React from "react";
import { Button } from "react-bootstrap";

const SwipeButtons = ({ startup }) => (
  <div>
    <Button onClick={() => startup.like()}>Like</Button>
    <Button onClick={() => startup.dislike()}>Dislike</Button>
  </div>
);

export default SwipeButtons;
