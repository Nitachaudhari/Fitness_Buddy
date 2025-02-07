// src/services/firestore.js

import { db } from "./firebase";
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";

// Send message
export const sendMessage = async (message, user) => {
    try {
        await addDoc(collection(db, "messages"), {
            text: message,
            user: user,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

// Get messages
export const getMessages = async () => {
    try {
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, orderBy("timestamp"));
        const querySnapshot = await getDocs(q);
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};
