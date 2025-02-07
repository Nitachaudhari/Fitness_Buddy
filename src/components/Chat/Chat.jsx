
import React, { useState, useEffect } from "react";
import { sendMessage, getMessages } from "../../services/firestore";
import { auth } from "../../services/firebase";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(newMessage, auth.currentUser.displayName);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
