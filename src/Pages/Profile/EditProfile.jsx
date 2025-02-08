import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading } from "@chakra-ui/react";
import React from "react";
const EditProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    goal: "",
    preference: "",
    currentWeight: "",
    targetWeight: "",
    targetDate: "",
    bodyMeasurements: {
      chest: "",
      waist: "",
      hips: "",
      arms: "",
      thighs: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          ...data,
          bodyMeasurements: data.bodyMeasurements || {
            chest: "",
            waist: "",
            hips: "",
            arms: "",
            thighs: "",
          },
        });
      }
    };

    fetchProfile();
  }, [user]);

  // Handle text field updates
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle updates for body measurements (nested state)
  const handleBodyMeasurementChange = (e) => {
    setProfile({
      ...profile,
      bodyMeasurements: {
        ...profile.bodyMeasurements,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Save updated profile to Firebase
  const handleSave = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    try {
      await updateDoc(docRef, profile);
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="10" mb="10" p="5" borderWidth="1px" borderRadius="lg" bg="white">
      <VStack spacing="3">
        <Heading mb="2">Edit Profile</Heading>

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={profile.name} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input name="age" type="number" value={profile.age} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Fitness Goal</FormLabel>
          <Input name="goal" value={profile.goal} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Workout Preference</FormLabel>
          <Input name="preference" value={profile.preference} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Current Weight (kg)</FormLabel>
          <Input name="currentWeight" type="number" value={profile.currentWeight} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Target Weight (kg)</FormLabel>
          <Input name="targetWeight" type="number" value={profile.targetWeight} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Target Achievement Date</FormLabel>
          <Input name="targetDate" type="date" value={profile.targetDate} onChange={handleChange} />
        </FormControl>

        {/* Body Measurements Section */}
        <Heading size="md" mb="1">Body Measurements (inch)</Heading>

        <FormControl>
          <FormLabel>Chest</FormLabel>
          <Input name="chest" type="number" value={profile.bodyMeasurements.chest} onChange={handleBodyMeasurementChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Waist</FormLabel>
          <Input name="waist" type="number" value={profile.bodyMeasurements.waist} onChange={handleBodyMeasurementChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Hips</FormLabel>
          <Input name="hips" type="number" value={profile.bodyMeasurements.hips} onChange={handleBodyMeasurementChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Arms</FormLabel>
          <Input name="arms" type="number" value={profile.bodyMeasurements.arms} onChange={handleBodyMeasurementChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Thighs</FormLabel>
          <Input name="thighs" type="number" value={profile.bodyMeasurements.thighs} onChange={handleBodyMeasurementChange} />
        </FormControl>

        <VStack spacing="3">
          <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
          <Button colorScheme="gray" onClick={() => navigate("/dashboard")}>Cancel</Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default EditProfile;
