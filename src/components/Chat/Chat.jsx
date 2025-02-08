import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Message from "./Message";

const Chat = () => {
    const { buddyId } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!buddyId || !user) return;

        const chatId = [user.uid, buddyId].sort().join("_");

        const q = query(
            collection(db, "chats", chatId, "messages"),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [buddyId, user]);

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        const chatId = [user.uid, buddyId].sort().join("_");

        await addDoc(collection(db, "chats", chatId, "messages"), {
            senderId: user.uid,
            senderName: user.name,
            text: newMessage,
            timestamp: serverTimestamp(),
        });

        setNewMessage("");
    };

    return (
        <div>
            <h2>Chat with Buddy</h2>
            <div>
                {messages.map((msg) => (
                    <Message key={msg.id} message={msg} />
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
