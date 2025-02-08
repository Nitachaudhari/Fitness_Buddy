import { useState, useEffect } from "react";
import React from "react";
import { auth, db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { Box, Container, Heading, VStack, HStack, Button, Card, CardHeader, CardBody, Avatar, Text, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tag, TagLabel, SimpleGrid, useToast, Progress } from "@chakra-ui/react";
import { Activity, MapPin, Target, Weight, Calendar, Users } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const BuddyFinder = () => {
  const { user } = useAuth();
  const [potentialBuddies, setPotentialBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    goalType: "",
    activityLevel: "",
    maxDistance: 10,
    weeklyGoal: "",
    workoutFrequency: "",
  });

  // Match fitness goal icons to your profile types
  const goalIcons = {
    "lose-weight": Weight,
    "gain-muscle": Activity,
    "improve-fitness": Target,
    "maintain": Calendar,
  };

  useEffect(() => {
    if (user) {
      fetchPotentialBuddies();
    }
  }, [filters, user]);

  const fetchPotentialBuddies = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      
      // Create base query
      let baseQuery = query(usersRef);
      
      // Add filters
      if (filters.goalType) {
        baseQuery = query(baseQuery, where("goalType", "==", filters.goalType));
      }
      if (filters.activityLevel) {
        baseQuery = query(baseQuery, where("activityLevel", "==", filters.activityLevel));
      }
      
      const querySnapshot = await getDocs(baseQuery);
      const buddies = [];
      
      querySnapshot.forEach((doc) => {
        const buddyData = doc.data();
        // Filter out the current user and apply additional filters
        if (doc.id !== user.uid && matchesFilters(buddyData)) {
          buddies.push({
            id: doc.id,
            ...buddyData,
          });
        }
      });
      
      setPotentialBuddies(buddies);
    } catch (error) {
      console.error("Error fetching buddies:", error);
      toast({
        title: "Error",
        description: "Failed to load potential buddies",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const matchesFilters = (buddy) => {
    if (filters.weeklyGoal && buddy.weeklyGoal !== filters.weeklyGoal) return false;
    if (filters.workoutFrequency && buddy.workoutFrequency !== filters.workoutFrequency) return false;
    // Add more matching logic based on your needs
    return true;
  };

  const calculateCompatibility = (buddy) => {
    let score = 0;
    let factors = 0;
    
    // Goal Type Match
    if (buddy.goalType === filters.goalType) {
      score += 30;
      factors++;
    }
    
    // Activity Level Match
    if (buddy.activityLevel === filters.activityLevel) {
      score += 25;
      factors++;
    }
    
    // Weekly Goal Match
    if (buddy.weeklyGoal === filters.weeklyGoal) {
      score += 20;
      factors++;
    }
    
    // Workout Frequency Match
    if (buddy.workoutFrequency === filters.workoutFrequency) {
      score += 25;
      factors++;
    }
    
    return factors > 0 ? Math.round((score / (factors * 100)) * 100) : 0;
  };

  console.log(user)

  return (
    <Container maxW="800px" py="4">
      <VStack spacing="4">
        <Heading size="lg">Find Your Fitness Buddy</Heading>

        <Card w="full" variant="outline" size="sm">
          <CardHeader pb="2">
            <Heading size="sm">Filter Matches</Heading>
          </CardHeader>
          <CardBody pt="0">
            <SimpleGrid columns={2} spacing="4">
              <Box>
                <Text fontSize="sm" mb="2">Fitness Goal</Text>
                <Select
                  size="sm"
                  value={filters.goalType}
                  onChange={(e) => setFilters({...filters, goalType: e.target.value})}
                >
                  <option value="">Any Goal</option>
                  <option value="lose-weight">Lose Weight</option>
                  <option value="gain-muscle">Gain Muscle</option>
                  <option value="improve-fitness">Improve Fitness</option>
                  <option value="maintain">Maintain Weight</option>
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" mb="2">Activity Level</Text>
                <Select
                  size="sm"
                  value={filters.activityLevel}
                  onChange={(e) => setFilters({...filters, activityLevel: e.target.value})}
                >
                  <option value="">Any Level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                  <option value="extra">Extra Active</option>
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" mb="2">Weekly Goal</Text>
                <Select
                  size="sm"
                  value={filters.weeklyGoal}
                  onChange={(e) => setFilters({...filters, weeklyGoal: e.target.value})}
                >
                  <option value="">Any Goal</option>
                  <option value="0.25">0.25 kg/week</option>
                  <option value="0.5">0.5 kg/week</option>
                  <option value="0.75">0.75 kg/week</option>
                  <option value="1">1 kg/week</option>
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" mb="2">Distance Range: {filters.maxDistance}km</Text>
                <Slider
                  value={filters.maxDistance}
                  onChange={(v) => setFilters({...filters, maxDistance: v})}
                  min={1}
                  max={50}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>

        {loading ? (
          <Progress size="xs" isIndeterminate w="full" />
        ) : (
          <VStack spacing="4" w="full">
            {potentialBuddies.map((buddy) => (
              <Card key={buddy.id} w="full" variant="outline">
                <CardBody>
                  <HStack spacing="4" align="start">
                    <Avatar size="lg" name={buddy.name} />
                    <VStack align="start" flex="1" spacing="2">
                      <HStack justify="space-between" w="full">
                        <Heading size="md">{buddy.name}</Heading>
                        <Tag colorScheme="green">
                          <TagLabel>{calculateCompatibility(buddy)}% Match</TagLabel>
                        </Tag>
                      </HStack>

                      <HStack spacing="4">
                        {buddy.goalType && (
                          <Tag size="sm" colorScheme="blue">
                            {React.createElement(goalIcons[buddy.goalType], { size: 14, style: { marginRight: '4px' } })}
                            <TagLabel>{buddy.goalType.replace('-', ' ').toUpperCase()}</TagLabel>
                          </Tag>
                        )}
                        <Tag size="sm" colorScheme="purple">
                          <Activity size={14} style={{ marginRight: '4px' }} />
                          <TagLabel>{buddy.activityLevel}</TagLabel>
                        </Tag>
                      </HStack>

                      <Text fontSize="sm" color="gray.600">
                        Goals: {buddy.specificGoals ? buddy.specificGoals.join(', ') : "No goals specified"}
                      </Text>

                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<Users size={16} />}
                        onClick={() => navigate(`/message/${buddy.id}`)} // Navigate to messaging page
                      >
                        Send Message
                      </Button>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default BuddyFinder;
