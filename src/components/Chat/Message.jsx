import React from "react";
import { useAuth } from "../../context/AuthContext";

const Message = ({ message }) => {
    const { user } = useAuth();
    const isUserMessage = message.senderId === user.uid;

    return (
        <div style={{
            display: "flex",
            justifyContent: isUserMessage ? "flex-end" : "flex-start",
            marginBottom: "10px",
        }}>
            <div style={{
                backgroundColor: isUserMessage ? "#DCF8C6" : "#E5E5EA",
                padding: "8px 12px",
                borderRadius: "10px",
                maxWidth: "60%",
            }}>
                <strong>{isUserMessage ? "You" : message.senderName}</strong>
                <p style={{ margin: "5px 0" }}>{message.text}</p>
                <small style={{ fontSize: "10px", color: "#555" }}>
                    {new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}
                </small>
            </div>
        </div>
    );
};

export default Message;
