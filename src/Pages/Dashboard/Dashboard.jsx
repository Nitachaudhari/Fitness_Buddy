import { useState, useEffect } from "react";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Heading, Text, VStack, SimpleGrid, Container, Card, CardHeader, CardBody, Stat,
  StatLabel, StatNumber, Alert, AlertIcon, AlertTitle, AlertDescription, Icon, Flex, useColorModeValue
} from "@chakra-ui/react";
import { FiTarget, FiActivity, FiCalendar, FiUser, FiUsers } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Define background and border colors based on the color mode
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (!user) {
    return (
      <Container centerContent>
        <Alert status="error" mt="10" maxW="400px">
          <AlertIcon />
          <AlertTitle mr={2}>You need to log in first!</AlertTitle>
          <AlertDescription>
            Please log in to view your dashboard and profile.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container centerContent>
        <Text mt="10">Loading profile...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="1200px" py="8">
      <VStack spacing="6" align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>Fitness Dashboard</Heading>
          <Flex gap="4">
            <Button
              colorScheme="green"
              leftIcon={<FiUsers />}
              onClick={() => navigate("/find-buddy")}
            >
              Find Buddy
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </Button>
          </Flex>
        </Flex>

        {profile.location && (
          <Box mb="6" p="4" bg={bgColor} borderRadius="md" borderColor={borderColor} borderWidth={1}>
            <Text fontSize="lg" color={textColor}>
              <strong>Location:</strong> City: {profile.city} lat: {profile.location.lat} lng: {profile.location.lng}
            </Text>
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="4">
          <StatCard icon={FiUser} label="Current Weight" value={`${profile.currentWeight || "N/A"} kg`} />
          <StatCard icon={FiTarget} label="Target Weight" value={`${profile.targetWeight || "N/A"} kg`} />
          <StatCard icon={FiActivity} label="Weekly Goal" value={`${profile.weeklyGoal || "N/A"} kg`} />
          <StatCard icon={FiCalendar} label="Workout Frequency" value={`${profile.workoutFrequency || "N/A"}/week`} />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
          <Card variant="outline">
            <CardHeader>
              <Heading size="md" color={textColor}>Personal Information</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing="3">
                <InfoRow label="Name" value={profile.name} />
                <InfoRow label="Age" value={profile.age} />
                <InfoRow label="Email" value={profile.email} />
                <InfoRow label="Activity Level" value={profile.activityLevel} />
                <InfoRow label="Primary Goal" value={profile.goalType} />
              </VStack>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <Heading size="md" color={textColor}>Body Measurements</Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={2} spacing="4">
                <InfoRow label="Chest" value={`${profile.measurements?.chest || "N/A"} cm`} />
                <InfoRow label="Waist" value={`${profile.measurements?.waist || "N/A"} cm`} />
                <InfoRow label="Hips" value={`${profile.measurements?.hips || "N/A"} cm`} />
                <InfoRow label="Arms" value={`${profile.measurements?.arms || "N/A"} cm`} />
                <InfoRow label="Thighs" value={`${profile.measurements?.thighs || "N/A"} cm`} />
              </SimpleGrid>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Card variant="outline">
          <CardHeader>
            <Heading size="md" color={textColor}>Specific Goals</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
              {profile.specificGoals?.map((goal, index) => (
                <Box key={index} p="3" borderRadius="md" bg={useColorModeValue("blue.50", "blue.900")}>
                  <Text color={textColor}>✔ {goal}</Text>
                </Box>
              )) || <Text color={textColor}>No specific goals set</Text>}
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

const StatCard = ({ icon, label, value }) => (
  <Card variant="outline">
    <CardBody>
      <Stat>
        <Flex align="center" mb="2">
          <Icon as={icon} mr="2" boxSize="5" />
          <StatLabel>{label}</StatLabel>
        </Flex>
        <StatNumber fontSize="2xl">{value}</StatNumber>
      </Stat>
    </CardBody>
  </Card>
);

const InfoRow = ({ label, value }) => (
  <Flex justify="space-between" align="center">
    <Text fontWeight="bold">{label}:</Text>
    <Text>{value || "Not provided"}</Text>
  </Flex>
);

export default Dashboard;
