import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { VStack, Heading, Text, Box, Button } from "@chakra-ui/react";

const BuddyMatch = () => {
  const { user } = useAuth();
  const [buddies, setBuddies] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return;

      const usersCollection = collection(db, "users");
      const userDocs = await getDocs(usersCollection);
      const users = userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Find the logged-in user's profile
      const currentUserProfile = users.find((u) => u.id === user.uid);
      setUserProfile(currentUserProfile);

      if (currentUserProfile) {
        // Match based on workout preference & location
        const matchedBuddies = users.filter(
          (u) =>
            u.id !== user.uid && // Exclude self
            u.workoutPreference === currentUserProfile.workoutPreference && // Match workout type
            u.location === currentUserProfile.location // Match location
        );
        setBuddies(matchedBuddies);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <VStack spacing={4} p={6}>
      <Heading>Find a Workout Buddy</Heading>
      {buddies.length > 0 ? (
        buddies.map((buddy) => (
          <Box key={buddy.id} p={4} border="1px solid gray" borderRadius="md">
            <Text><strong>Name:</strong> {buddy.name}</Text>
            <Text><strong>Location:</strong> {buddy.location}</Text>
            <Text><strong>Workout Preference:</strong> {buddy.workoutPreference}</Text>
            <Button colorScheme="blue">Connect</Button>
          </Box>
        ))
      ) : (
        <Text>No buddies found matching your preferences.</Text>
      )}
    </VStack>
  );
};

export default BuddyMatch;
