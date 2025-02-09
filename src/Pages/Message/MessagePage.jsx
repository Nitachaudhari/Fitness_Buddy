import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { collection, addDoc, query, where, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { Box, VStack, Input, Button, Text, HStack, Avatar } from "@chakra-ui/react";

const MessagePage = () => {
  const { buddyId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    if (!auth.currentUser) return;

    const chatRef = collection(db, "messages");
    const q = query(
      chatRef,
      where("participants", "array-contains", auth.currentUser.uid),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(q);
    const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
    setMessages(fetchedMessages);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      senderId: auth.currentUser.uid,
      receiverId: buddyId,
      text: newMessage,
      timestamp: new Date(),
      participants: [auth.currentUser.uid, buddyId],
    });

    setNewMessage("");
    fetchMessages();
  };

  return (
    <Box maxW="600px" mx="auto" mt="6">
      <VStack spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Chat with Your Buddy
        </Text>

        <VStack w="full" h="400px" overflowY="auto" p="4" border="1px solid #ddd" borderRadius="md">
          {messages.map((msg, index) => (
            <HStack
              key={index}
              alignSelf={msg.senderId === auth.currentUser.uid ? "flex-end" : "flex-start"}
              bg={msg.senderId === auth.currentUser.uid ? "blue.100" : "gray.100"}
              p="2"
              borderRadius="md"
            >
              <Avatar size="sm" />
              <Text>{msg.text}</Text>
            </HStack>
          ))}
        </VStack>

        <HStack w="full">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={sendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MessagePage;
