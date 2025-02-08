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
  useToast
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Dumbbell, Flame, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProgressReport = () => {
  const reportRef = useRef(null);
  const toast = useToast();

  const workoutData = {
    completedWorkouts: 4,
    plannedWorkouts: 5,
    caloriesBurned: 1200,
    weeklyGoal: 1500,
    dailyWorkouts: [
      { day: 'Mon', duration: 45, calories: 300 },
      { day: 'Tue', duration: 30, calories: 250 },
      { day: 'Wed', duration: 0, calories: 0 },
      { day: 'Thu', duration: 60, calories: 400 },
      { day: 'Fri', duration: 35, calories: 250 },
      { day: 'Sat', duration: 0, calories: 0 },
      { day: 'Sun', duration: 0, calories: 0 },
    ]
  };

  const workoutCompletion = (workoutData.completedWorkouts / workoutData.plannedWorkouts) * 100;
  const calorieProgress = (workoutData.caloriesBurned / workoutData.weeklyGoal) * 100;

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

  return (
    <Container maxW="container.xl" py={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color='black'>Weekly Progress Report</Heading>
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
                  <Heading size="md" color='black'>Workout Completion</Heading>
                  <Box color="blue.500">
                    <Dumbbell size={16} />
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Heading size="lg" color='black'>{workoutData.completedWorkouts}/{workoutData.plannedWorkouts}</Heading>
                <Progress value={workoutCompletion} mt={2} colorScheme="blue" />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color='black'>Calories Burned</Heading>
                  <Box color="orange.500">
                    <Flame size={16} />
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Heading size="lg" color='black'>{workoutData.caloriesBurned}</Heading>
                <Progress value={calorieProgress} mt={2} colorScheme="orange" />
              </CardBody>
            </Card>

            <Card >
              <CardHeader>
                <Flex justify="space-between"  align="center">
                  <Heading size="md" color='black'>Weekly Goal Progress</Heading>
                  <Box color="yellow.500">
                    <Trophy size={16} />
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Heading size="lg" color='black'>{Math.round(calorieProgress)}%</Heading>
                <Text fontSize="xs" color="gray.500">Target: {workoutData.weeklyGoal} calories</Text>
              </CardBody>
            </Card>
          </Grid>

          <Card>
            <CardHeader>
              <Heading size="lg" color='black'>Weekly Activity</Heading>
            </CardHeader>
            <CardBody>
              <Box height="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData.dailyWorkouts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="duration"
                      stroke="#8884d8"
                      name="Duration (min)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="calories"
                      stroke="#82ca9d"
                      name="Calories"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Weekly Insights</Heading>
            </CardHeader>
            <CardBody>
              <List spacing={3}>
                <ListItem>
                  <Flex align="center" gap={2}>
                    <Circle size="40px" bg="green.100">
                      <Box color="green.600">
                        <Trophy size={16} />
                      </Box>
                    </Circle>
                    <Text>Completed {workoutData.completedWorkouts} workouts this week</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" gap={2}>
                    <Circle size="40px" bg="orange.100">
                      <Box color="orange.600">
                        <Flame size={16} />
                      </Box>
                    </Circle>
                    <Text>Burned {workoutData.caloriesBurned} calories</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" gap={2}>
                    <Circle size="40px" bg="blue.100">
                      <Box color="blue.600">
                        <Dumbbell size={16} />
                      </Box>
                    </Circle>
                    <Text>Most active day: Thursday (60 minutes)</Text>
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