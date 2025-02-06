import React, { useState } from 'react';
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
  Flex
} from '@chakra-ui/react';

const WorkoutTracking = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: '',
    intensity: '',
    notes: ''
  });

  const workoutTypes = [
    'Running', 
    'Weightlifting', 
    'Yoga', 
    'Cycling', 
    'Swimming',  
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addWorkout = () => {
    if (newWorkout.type && newWorkout.duration) {
      const workoutToAdd = {
        ...newWorkout,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      
      setWorkouts(prev => [workoutToAdd, ...prev]);
      
     
      setNewWorkout({
        type: '',
        duration: '',
        intensity: '',
        notes: ''
      });
    }
  };

  const calculateTotalWorkoutTime = () => {
    return workouts.reduce((total, workout) => 
      total + parseInt(workout.duration || 0), 0
    );
  };

  return (
    <Card maxW="2xl" mx="auto" padding='10px'>
      <CardHeader bg='rgb(82, 187, 236)' borderRadius='5px' marginBottom='10px'>
        <Heading color='white' size="md" >Workout Tracker</Heading>
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
            value={newWorkout.intensity}
            onChange={(e) => setNewWorkout(prev => ({...prev, intensity: e.target.value}))}
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
            isDisabled={!newWorkout.type || !newWorkout.duration}
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
                        {workout.date} • {workout.duration} mins • {workout.intensity}  • Notes:  {workout.notes ? workout.notes : ''}
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
        <Text width="full" textAlign="center" fontSize="md" color="black.600" fontWeight='bold' >
          Total Workout Time: {calculateTotalWorkoutTime()} minutes
        </Text>
      </CardFooter>
    </Card>
  );
};

export default WorkoutTracking;