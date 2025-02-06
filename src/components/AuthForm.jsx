import React, { useState } from 'react';
import {  Box,  Button,  Container,  Divider,  FormControl,  FormLabel,  Input, Stack,  Text,
  Tab,  Tabs,  TabList,  TabPanel,  TabPanels,  useColorModeValue,  Alert,  AlertIcon,  
  VStack,  HStack,  useToast} from '@chakra-ui/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import {   createUserWithEmailAndPassword,   signInWithEmailAndPassword,  GoogleAuthProvider,  FacebookAuthProvider,  signInWithPopup} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';


const AuthForms = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Firebase providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const saveUserToFirestore = async (userId, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      // Update last login
      await setDoc(
        doc(db, 'users', result.user.uid),
        {
          lastLogin: new Date().toISOString()
        },
        { merge: true }
      );

      navigate('/dashboard')
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );

      // Save additional user data to Firestore
      await saveUserToFirestore(result.user.uid, {
        name: registerData.name,
        email: registerData.email,
      });

      navigate('/profile')
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Save new user data to Firestore
        await saveUserToFirestore(result.user.uid, {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        });
      } else {
        // Update last login
        await setDoc(
          doc(db, 'users', result.user.uid),
          {
            lastLogin: new Date().toISOString()
          },
          { merge: true }
        );
      }

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => handleSocialLogin(googleProvider);
  const handleFacebookLogin = () => handleSocialLogin(facebookProvider);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        bg={bgColor}
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        border="1px"
        borderColor={borderColor}
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            {/* Login Panel */}
            <TabPanel>
              <VStack spacing={4} as="form" onSubmit={handleLogin}>
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>

                <Stack spacing={4} width="full">
                  <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
                      or continue with
                    </Text>
                    <Divider />
                  </HStack>

                  <Stack spacing={2}>
                    <Button
                      onClick={handleGoogleLogin}
                      variant="outline"
                      leftIcon={<FaGoogle />}
                      width="full"
                      isLoading={isLoading}
                    >
                      Continue with Google
                    </Button>
                    <Button
                      onClick={handleFacebookLogin}
                      variant="outline"
                      leftIcon={<FaFacebook />}
                      width="full"
                      isLoading={isLoading}
                    >
                      Continue with Facebook
                    </Button>
                  </Stack>
                </Stack>
              </VStack>
            </TabPanel>

            {/* Register Panel */}
            <TabPanel>
              <VStack spacing={4} as="form" onSubmit={handleRegister}>
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Enter your name"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value
                      })
                    }
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>

                <Stack spacing={4} width="full">
                  <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
                      or continue with
                    </Text>
                    <Divider />
                  </HStack>

                  <Stack spacing={2}>
                    <Button
                      onClick={handleGoogleLogin}
                      variant="outline"
                      leftIcon={<FaGoogle />}
                      width="full"
                      isLoading={isLoading}
                    >
                      Continue with Google
                    </Button>
                    <Button
                      onClick={handleFacebookLogin}
                      variant="outline"
                      leftIcon={<FaFacebook />}
                      width="full"
                      isLoading={isLoading}
                    >
                      Continue with Facebook
                    </Button>
                  </Stack>
                </Stack>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthForms;