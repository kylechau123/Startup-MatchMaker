import React from "react";

const Message = ({ message }) => (
  <div>
    <strong>{message.sender}</strong>: {message.text}
  </div>
);

export default Message;
