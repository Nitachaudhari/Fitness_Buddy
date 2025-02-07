
import React from "react";

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <div className="message-input">
      <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
        placeholder="Type a message..." 
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
