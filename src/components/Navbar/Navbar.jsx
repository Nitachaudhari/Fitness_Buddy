import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Box, Flex, Text, useColorMode, IconButton } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, Moon, Sun } from 'lucide-react'; // Import the icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra UI hook for theme switching

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <Box 
      as="nav" 
      bg={colorMode === 'light' ? 'blue.500' : 'blue.700'} // Change bg color based on mode
      color={colorMode === 'light' ? 'black' : 'white'} // Text color changes based on mode
      py={4}
      position="sticky" 
      top="0" 
      fontWeight="bold"
      zIndex="999" // Ensures the navbar stays above other content
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" color="white">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="inherit">
            🏋️‍♂️Fitness Buddy🏋️‍♂️
          </Text>
        </Box>

        <Flex as="ul" listStyleType="none" spacing={4} align="center">
          <Box as="li" mx={2}>
            <NavLink to="/" activeclassname="active-link">
              Home
            </NavLink>
          </Box>
          <Box as="li" mx={2}>
            <NavLink to="/dashboard" activeclassname="active-link">
              Dashboard
            </NavLink>
          </Box>
          <Box as="li" mx={2}>
            <NavLink to="/workout-tracker" activeclassname="active-link">
              Workout Tracker
            </NavLink>
          </Box>
          <Box as="li" mx={2}>
            <NavLink to="/tips" activeclassname="active-link">
              Tips
            </NavLink>
          </Box>
          {/* <Box as="li" mx={2}>
            <NavLink to="/about" activeclassname="active-link">
              About us
            </NavLink>
          </Box>
          <Box as="li" mx={2}>
            <NavLink to="/contact" activeclassname="active-link">
              Contact us
            </NavLink>
          </Box> */}
          
          
          {/* Display Login if user is not logged in */}
          {!user ? (
            <Box as="li" mx={2} color="white">
              <NavLink to="/authform" activeclassname="active-link">
                <Button rightIcon={<LogIn />} colorScheme="teal" color={colorMode === 'light' ? 'white' : 'white'}>
                  Login
                </Button>
              </NavLink>
            </Box>
          ) : (
            // Display Logout if the user is logged in
            <Box as="li" mx={2} >
              <Button rightIcon={<LogOut />} colorScheme="red" color={colorMode === 'light' ? 'white' : 'white'} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}

          {/* Dark/Light Mode Toggle Button */}
          <Box as="li" mx={2}>
            <IconButton
              ml="20"
              icon={colorMode === 'light' ? <Moon /> : <Sun />}
              aria-label="Toggle theme"
              onClick={toggleColorMode}
              variant="ghost"
              color={colorMode === 'light' ? 'white' : 'white'}
              _hover={{ bg: 'transparent' }}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
