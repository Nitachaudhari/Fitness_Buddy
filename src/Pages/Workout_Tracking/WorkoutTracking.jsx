import React, { useState, useEffect } from 'react';
import { 
  Box, 
  VStack, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Heading, 
  Select, 
  Input, 
  Button, 
  Text,
  Flex,
  useToast
} from '@chakra-ui/react';
import { db,auth } from '../../services/firebase';
// import { db, auth } from '../../firebase/config';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  Timestamp
} from 'firebase/firestore';
import ProgressReport from '../../Pages/Progress_Report/ProgressReport';

const WorkoutTracking = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: '',
    intensity: '',
    notes: ''
  });
  const [totalCalories, setTotalCalories] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState(0);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  
  const toast = useToast();

  const workoutTypes = [
    'Running', 
    'Weightlifting', 
    'Yoga', 
    'Cycling', 
    'Swimming',  
    'Other'
  ];

  const calorieMap = {
    Running: 10,      
    Weightlifting: 5, 
    Yoga: 3,         
    Cycling: 8,     
    Swimming: 7,    
    Other: 4        
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    const workoutQuery = query(
      collection(db, "workouts"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(workoutQuery, (snapshot) => {
      const workoutList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().timestamp?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
      }));

      const sortedWorkouts = workoutList.sort((a, b) => b.timestamp - a.timestamp);
      setWorkouts(sortedWorkouts);
      

      const totalCalories = workoutList.reduce((total, workout) => total + (workout.calories || 0), 0);
      const completedWorkouts = workoutList.filter(workout => parseInt(workout.duration) > 0).length;
      const totalWorkoutTime = workoutList.reduce((total, workout) => total + (parseInt(workout.duration) || 0), 0);

      setTotalCalories(totalCalories);
      setCompletedWorkouts(completedWorkouts);
      setTotalWorkoutTime(totalWorkoutTime);
    }, (error) => {
      console.error("Error fetching workouts:", error);
      toast({
        title: "Error fetching workouts",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });

    return () => unsubscribe();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateWorkout = (workout) => {
    if (!workout.type) return "Please select a workout type";
    if (!workout.duration || workout.duration <= 0) return "Please enter a valid duration";
    if (!workout.intensity) return "Please select an intensity level";
    return null;
  };

  const calculateCalories = (type, duration) => {
    return calorieMap[type] * duration;
  };

  const addWorkout = async () => {
    if (!auth.currentUser) {
      console.error("No authenticated user found");
      toast({
        title: "Authentication required",
        description: "Please sign in to log workouts",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const validationError = validateWorkout(newWorkout);
    if (validationError) {
      console.error("Validation error:", validationError);
      toast({
        title: "Validation Error",
        description: validationError,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const duration = parseInt(newWorkout.duration);
      if (isNaN(duration)) {
        throw new Error("Invalid duration value");
      }

      const calories = calculateCalories(newWorkout.type, duration);

      const workoutData = {
        type: newWorkout.type.trim(),
        duration: duration,
        intensity: newWorkout.intensity.trim(),
        notes: newWorkout.notes?.trim() || "",
        calories: calories,
        userId: auth.currentUser.uid,
        timestamp: Timestamp.now(),
        createdAt: new Date().toISOString()
      };

      console.log("Sending workout data:", workoutData);

      const docRef = await addDoc(collection(db, 'workouts'), workoutData);
      console.log("Document written with ID:", docRef.id);

      toast({
        title: "Workout logged successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setNewWorkout({
        type: '',
        duration: '',
        intensity: '',
        notes: ''
      });
    } catch (error) {
      console.error("Error adding workout:", error);
      toast({
        title: "Error logging workout",
        description: error.message || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card maxW="3xl" mx="auto" padding='10px'>
      <CardHeader bg='rgb(82, 187, 236)' borderRadius='5px' marginBottom='10px'>
        <Heading color='white' size="md" textAlign='center'>Workout Tracker</Heading>
      </CardHeader>
      
      <CardBody>
        <VStack spacing={4}>
          <Select 
            placeholder="Select Workout Type"
            value={newWorkout.type}
            onChange={(e) => setNewWorkout(prev => ({...prev, type: e.target.value}))}
          >
            {workoutTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>

          <Input
            type="number"
            name="duration"
            value={newWorkout.duration}
            onChange={handleInputChange}
            placeholder="Duration (minutes)"
            min="0"
          />

          <Select 
            placeholder="Intensity Level"
            name="intensity"
            value={newWorkout.intensity}
            onChange={handleInputChange}
          >
            {['Low', 'Medium', 'High'].map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </Select>

          <Input
            name="notes"
            value={newWorkout.notes}
            onChange={handleInputChange}
            placeholder="Additional Notes (Optional)"
          />

          <Button 
            onClick={addWorkout}
            width="full"
            colorScheme="blue"
            isDisabled={!newWorkout.type || !newWorkout.duration || !newWorkout.intensity}
          >
            Log Workout
          </Button>

          {workouts.length > 0 && (
            <Box width="full" mt={6}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Workout History
              </Text>
              <VStack 
                spacing={2} 
                maxHeight="200px" 
                overflowY="auto"
                width="full"
              >
                {workouts.map(workout => (
                  <Flex 
                    key={workout.id} 
                    bg="gray.100" 
                    p={3} 
                    borderRadius="lg"
                    width="full"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Text fontWeight="medium">{workout.type}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {workout.date} • {workout.duration} mins • {workout.intensity}
                        {workout.notes && ` • Notes: ${workout.notes}`} 
                        <br />
                        <Text fontSize="xs" color="green.500">
                          Calories Burned: {workout.calories} kcal
                        </Text>
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </CardBody>

      <CardFooter>
        <Text width="full" textAlign="center" fontSize="md" color="black.600" fontWeight='bold'>
          Total Workout Time: {totalWorkoutTime} minutes
        </Text>
        <Text width="full" textAlign="center" fontSize="md" color="black.600">
          Completed Workouts: {completedWorkouts}
        </Text>
        <Text width="full" textAlign="center" fontSize="md" color="black.600">
          Total Calories Burned: {totalCalories} kcal
        </Text>
        
      </CardFooter>
      <br/>
      <ProgressReport
           totalCalories={totalCalories} 
           completedWorkouts={completedWorkouts} 
           totalWorkoutTime={totalWorkoutTime} 
        />
    </Card>
  );
};

export default WorkoutTracking;
