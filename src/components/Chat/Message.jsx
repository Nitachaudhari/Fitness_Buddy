
import React from "react";
const Message = ({ message }) => {
  return (
    <div className="message">
      <span className="user">{message.user}</span>
      <span className="text">{message.text}</span> {/* Ensure no dots here */}
    </div>
  );
};


export default Message;
