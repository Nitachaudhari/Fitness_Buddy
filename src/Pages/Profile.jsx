import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Box, Button, Input, Select, VStack, Heading,
  Text, Checkbox, Grid, FormControl, FormLabel, Card,
  CardHeader, CardBody, SimpleGrid, Container, InputGroup,
  InputRightAddon, Stack, useColorModeValue
} from "@chakra-ui/react";
import { Activity, Weight, Target, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    goalType: "",
    targetWeight: "",
    currentWeight: "",
    weeklyGoal: "0.5",
    activityLevel: "moderate",
    workoutFrequency: "3",
    specificGoals: [],
    measurements: {
      chest: "",
      waist: "",
      hips: "",
      arms: "",
      thighs: "",
    },
    targetDate: "",
    city:"",
    location: { lat: "", lng: "" },
  });

  const goalTypes = [
    { id: "lose-weight", label: "Lose Weight", icon: Weight },
    { id: "gain-muscle", label: "Gain Muscle", icon: Activity },
    { id: "improve-fitness", label: "Improve Fitness", icon: Target },
    { id: "maintain", label: "Maintain Weight", icon: Calendar },
  ];

  const specificGoalOptions = [
    "Run 5K", "Do 10 Push-ups", "Touch Toes", "Hold Plank 1 Minute",
    "Bench Press Body Weight", "Complete Full Pull-up", "Join Group Class", "Try Yoga"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      measurements: { ...prev.measurements, [name]: value },
    }));
  };

  const handleSpecificGoalToggle = (goal) => {
    setFormData((prev) => ({
      ...prev,
      specificGoals: prev.specificGoals.includes(goal)
        ? prev.specificGoals.filter((g) => g !== goal)
        : [...prev.specificGoals, goal],
    }));
  };

  const handleProfileSave = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        email: user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error.message);
    }
  };

  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };


  return (
    <Container maxW="800px" py="4">
      <VStack spacing="3">
        <Heading size="lg" mb="2">Create Profile</Heading>

        <Card w="full" variant="outline" size="sm">
          <CardHeader pb="2">
            <Heading size="sm">Personal Information</Heading>
          </CardHeader>
          <CardBody pt="0">
            <Stack spacing="2">
              <FormControl>
                <FormLabel fontSize="sm">Full Name</FormLabel>
                <Input size="sm" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Age</FormLabel>
                <Input size="sm" type="number" name="age" value={formData.age} onChange={handleChange} />
              </FormControl>
            </Stack>
          </CardBody>
        </Card>

        <Card w="full" variant="outline" size="sm">
          <CardHeader pb="2">
            <Heading size="sm">Fitness Goals</Heading>
          </CardHeader>
          <CardBody pt="0">
            <VStack spacing="2" align="stretch">
              <SimpleGrid columns={2} spacing="2">
                {goalTypes.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    size="sm"
                    leftIcon={<Icon size={16} />}
                    onClick={() => setFormData((prev) => ({ ...prev, goalType: id }))}
                    colorScheme={formData.goalType === id ? "blue" : "gray"}
                    variant={formData.goalType === id ? "solid" : "outline"}
                  >
                    {label}
                  </Button>
                ))}
              </SimpleGrid>

              <SimpleGrid columns={2} spacing="2">
                <FormControl>
                  <FormLabel fontSize="sm">Current Weight</FormLabel>
                  <InputGroup size="sm">
                    <Input name="currentWeight" value={formData.currentWeight} onChange={handleChange} />
                    <InputRightAddon>kg</InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Target Weight</FormLabel>
                  <InputGroup size="sm">
                    <Input name="targetWeight" value={formData.targetWeight} onChange={handleChange} />
                    <InputRightAddon>kg</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing="2">
                <FormControl>
                  <FormLabel fontSize="sm">Weekly Goal</FormLabel>
                  <Select size="sm" name="weeklyGoal" value={formData.weeklyGoal} onChange={handleChange}>
                    <option value="0.25">0.25 kg/week</option>
                    <option value="0.5">0.5 kg/week</option>
                    <option value="0.75">0.75 kg/week</option>
                    <option value="1">1 kg/week</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Activity Level</FormLabel>
                  <Select size="sm" name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="very">Very Active</option>
                    <option value="extra">Extra Active</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        <Card w="full" variant="outline" size="sm">
          <CardHeader pb="2">
            <Heading size="sm">Body Measurements</Heading>
          </CardHeader>
          <CardBody pt="0">
            <SimpleGrid columns={2} spacing="2">
              {Object.keys(formData.measurements).map((measurement) => (
                <FormControl key={measurement}>
                  <FormLabel fontSize="sm">{measurement.charAt(0).toUpperCase() + measurement.slice(1)}</FormLabel>
                  <InputGroup size="sm">
                    <Input
                      name={measurement}
                      value={formData.measurements[measurement]}
                      onChange={handleMeasurementChange}
                    />
                    <InputRightAddon>cm</InputRightAddon>
                  </InputGroup>
                </FormControl>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        <Card w="full" variant="outline" size="sm">
          <CardHeader pb="2">
            <Heading size="sm">Specific Goals</Heading>
          </CardHeader>
          <CardBody pt="0">
            <SimpleGrid columns={2} spacing="2">
              {specificGoalOptions.map((goal) => (
                <Checkbox
                  key={goal}
                  size="sm"
                  colorScheme="blue"
                  isChecked={formData.specificGoals.includes(goal)}
                  onChange={() => handleSpecificGoalToggle(goal)}
                >
                  {goal}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        <FormControl>
          <FormLabel fontSize="sm">Target Date</FormLabel>
          <Input size="sm" type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} />
        </FormControl>
        <Card w="full" variant="outline" size="sm">
  <CardHeader pb="2">
    <Heading size="sm">Location</Heading>
  </CardHeader>
  <CardBody pt="0">
    <VStack spacing="2" align="stretch">
      {/* Manual city input */}
      <FormControl>
        <FormLabel fontSize="sm">City</FormLabel>
        <Input
          size="sm"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
        />
      </FormControl>
      {/* Button to get current location */}
      <FormControl>
        <FormLabel fontSize="sm">Current Location</FormLabel>
        <Button onClick={getLocation} colorScheme="teal" size="sm">
          Get My Location
        </Button>
        {formData.location.lat && formData.location.lng && (
          <Text fontSize="sm" mt="2">
            Latitude: {formData.location.lat}, Longitude: {formData.location.lng}
          </Text>
        )}
      </FormControl>

      
    </VStack>
  </CardBody>
</Card>

        <Button
          colorScheme="blue"
          size="md"
          width="full"
          onClick={handleProfileSave}
        >
          Save Profile
        </Button>
      </VStack>
    </Container>
  );
};

export default Profile;