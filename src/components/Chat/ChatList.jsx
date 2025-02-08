import React,{ useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Chat from "./Chat";

const ChatList = () => {
    const { user } = useAuth();
    const [buddies, setBuddies] = useState([]);
    const [selectedBuddy, setSelectedBuddy] = useState(null);

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, "buddies"), where("userIds", "array-contains", user.uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setBuddies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <div>
            <h1>My Buddies</h1>
            {buddies.length === 0 ? <p>No buddies matched yet.</p> : (
                <ul>
                    {buddies.map(buddy => (
                        <li key={buddy.id} onClick={() => setSelectedBuddy(buddy)}>
                            {buddy.name}
                        </li>
                    ))}
                </ul>
            )}

            {selectedBuddy && <Chat buddy={selectedBuddy} />}
        </div>
    );
};

export default ChatList;
