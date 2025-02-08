import React, { useRef } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Grid,
  List,
  ListItem,
  Flex,
  Text,
  Circle,
  Container,
  Stack,
  Button,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Trophy, Dumbbell, Flame, Download, TrendingUp, Calendar } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProgressReport = ({ totalCalories, completedWorkouts, totalWorkoutTime }) => {
  const reportRef = useRef(null);
  const toast = useToast();

  const getLast7Days = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString('en-GB'); 
      dates.push(formattedDate);
    }
    
    return dates;
  };

  const workoutData = {
    completedWorkouts: completedWorkouts,
    plannedWorkouts: totalWorkoutTime,
    caloriesBurned: totalCalories,
    weeklyGoal: 1500,
    dailyWorkouts: getLast7Days().map((date, index) => ({
      day: date,
      duration: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
      calories: [300, 250, 130, 400, 250, 0, 0][index],
      intensity: ['High', 'Medium', 'Low', 'High', 'Medium', 'Rest', 'Rest'][index],
    }))
  };

  const generatePDF = async () => {
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('weekly-progress-report.pdf');

      toast({
        title: "Success",
        description: "Report downloaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Error generating PDF:', error);
    }
  };

  const avgDuration = workoutData.dailyWorkouts
    .reduce((acc, curr) => acc + curr.duration, 0) / workoutData.dailyWorkouts.filter(d => d.duration > 0).length;
  
  const avgCalories = workoutData.dailyWorkouts
    .reduce((acc, curr) => acc + curr.calories, 0) / workoutData.dailyWorkouts.filter(d => d.calories > 0).length;

  return (
    <Container maxW="container.xl" py={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" color='black'>Weekly Progress Report</Heading>
          <Text color="gray.600">Week of {new Date().toLocaleDateString()}</Text>
        </Box>
        <Button
          leftIcon={<Download size={16} />}
          colorScheme="blue"
          onClick={generatePDF}
        >
          Download Report
        </Button>
      </Flex>

      <Box ref={reportRef}>
        <Stack spacing={6}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <Card>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color='black'>Workout Stats</Heading>
                  <Box color="blue.500">
                    <Dumbbell size={16} />
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Total Time</StatLabel>
                  <StatNumber>{totalWorkoutTime} mins</StatNumber>
                  <StatHelpText>Avg {avgDuration.toFixed(1)} mins per session</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color='black'>Energy Burned</Heading>
                  <Box color="orange.500">
                    <Flame size={16} />
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Total Calories</StatLabel>
                  <StatNumber>{totalCalories} kcal</StatNumber>
                  <StatHelpText>Avg {avgCalories.toFixed(0)} kcal per workout</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color='black'>Activity Overview</Heading>
                  <Box color="yellow.500">
                    <Calendar size={16} />
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Workouts Completed</StatLabel>
                  <StatNumber>{completedWorkouts}</StatNumber>
                  
                </Stat>
              </CardBody>
            </Card>
          </Grid>

          <Card>
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="lg" color='black'>Weekly Activity</Heading>
                <Box>
                  <Text color="gray.600">Daily Progress Tracking</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Box height="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData.dailyWorkouts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="day" tickFormatter={(tick) =>  {
                        const [day, month, year] = tick.split('/');
                        return `${day}/${month}`;
                      }} />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <Box bg="white" p={3} shadow="md" borderRadius="md">
                              <Text fontWeight="bold">{label}</Text>
                              <Text>Duration: {workoutData.dailyWorkouts.find(d => d.day === label).duration} mins</Text>
                              <Text>Calories: {workoutData.dailyWorkouts.find(d => d.day === label).calories}</Text>
                              <Text>Intensity: {workoutData.dailyWorkouts.find(d => d.day === label).intensity}</Text>
                            </Box>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="duration"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Duration (min)"
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="calories"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Calories"
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md" color='black'>Weekly Insights</Heading>
            </CardHeader>
            <CardBody>
              <List spacing={4}>
                <ListItem>
                  <Flex align="center" gap={3}>
                    <Circle size="40px" bg="green.100">
                      <Box color="green.600">
                        <Trophy size={16} />
                      </Box>
                    </Circle>
                    <Box>
                      <Text fontWeight="medium">Achievement</Text>
                      <Text color="gray.600">Completed {workoutData.completedWorkouts} workouts</Text>
                    </Box>
                  </Flex>
                </ListItem>
                <Divider />
                <ListItem>
                  <Flex align="center" gap={3}>
                    <Circle size="40px" bg="orange.100">
                      <Box color="orange.600">
                        <Flame size={16} />
                      </Box>
                    </Circle>
                    <Box>
                      <Text fontWeight="medium">Calorie Goal</Text>
                      <Text color="gray.600">Burned {workoutData.caloriesBurned} kcal</Text>
                    </Box>
                  </Flex>
                </ListItem>
                <Divider />
                <ListItem>
                  <Flex align="center" gap={3}>
                    <Circle size="40px" bg="blue.100">
                      <Box color="blue.600">
                        <TrendingUp size={16} />
                      </Box>
                    </Circle>
                    <Box>
                      <Text fontWeight="medium">Progress Analysis</Text>
                      <Text color="gray.600">Average workout duration: {avgDuration.toFixed(1)} minutes</Text>
                    </Box>
                  </Flex>
                </ListItem>
              </List>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProgressReport;
