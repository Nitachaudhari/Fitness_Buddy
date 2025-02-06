import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from 'lucide-react'; // Import the icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      bg="teal.500" 
      color="white" 
      py={4}
      position="sticky" 
      top="0" 
      zIndex="999" // Ensures the navbar stays above other content
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Fitness Buddy
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
            <NavLink to="/" activeclassname="active-link">
              Tips
            </NavLink>
          </Box>
          <Box as="li" mx={2}>
            <NavLink to="/about" activeclassname="active-link">
              About us
            </NavLink>
          </Box>
          <Box as="li" mx={2}>
            <NavLink to="/contact" activeclassname="active-link">
              Contact us
            </NavLink>
          </Box>
          
          {/* Display Login if user is not logged in */}
          {!user ? (
            <Box as="li" mx={2}>
              <NavLink to="/authform" activeclassname="active-link">
                <Button leftIcon={<LogIn />} colorScheme="teal">
                  Login
                </Button>
              </NavLink>
            </Box>
          ) : (
            // Display Logout if user is logged in
            <Box as="li" mx={2}>
              <Button leftIcon={<LogOut />} colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
