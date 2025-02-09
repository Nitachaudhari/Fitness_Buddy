import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Button, Box, Flex, Text, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, useColorMode 
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, Moon, Sun, Menu } from 'lucide-react'; // Import icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra UI hook for theme switching
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for drawer
  const [placement] = useState("left"); // Menu placement

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home"); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <Box 
      as="nav" 
      bg={colorMode === 'light' ? 'blue.500' : 'blue.700'}
      color="white"
      py={4}
      position="sticky"
      top="0"
      zIndex="999"
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        
        {/* Hamburger Menu Icon (Visible on Small Screens) */}
        <IconButton 
          display={{ base: "block", md: "none" }} 
          icon={<Menu />} 
          aria-label="Open menu" 
          onClick={onOpen}
          variant="ghost"
          color="white"
        />

        {/* Logo */}
        <Text fontSize="2xl" fontWeight="bold" color="white">
          🏋️‍♂️Fitness Buddy🏋️‍♂️
        </Text>

        {/* Navbar Links (Hidden on Mobile) */}
        <Flex as="ul" listStyleType="none" spacing={4} align="center" display={{ base: "none", md: "flex" }}>
          <Box as="li" mx={2}><NavLink to="/">Home</NavLink></Box>
          <Box as="li" mx={2}><NavLink to="/dashboard">Dashboard</NavLink></Box>
          <Box as="li" mx={2}><NavLink to="/workout-tracker">Workout Tracker</NavLink></Box>
          <Box as="li" mx={2}><NavLink to="/tips">Tips</NavLink></Box>

          {/* Login / Logout Button */}
          {!user ? (
            <Box as="li" mx={2}>
              <NavLink to="/authform">
                <Button 
                  rightIcon={<LogIn />} 
                  color="white" 
                  borderColor="white" 
                  variant="outline" 
                >
                  Login
                </Button>
              </NavLink>
            </Box>
          ) : (
            <Box as="li" mx={2}>
              <Button rightIcon={<LogOut />} colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}

          {/* Theme Toggle Button */}
          <Box as="li" mx={2}>
            <IconButton
              icon={colorMode === 'light' ? <Moon /> : <Sun />}
              aria-label="Toggle theme"
              onClick={toggleColorMode}
              variant="ghost"
              color="white"
              _hover={{ bg: 'transparent' }}
            />
          </Box>
        </Flex>
      </Flex>

      {/* Hamburger Menu Drawer */}
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === 'light' ? 'blue.500' : 'blue.700'} color="white">
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column" gap={4}>
              <NavLink to="/" onClick={onClose}>Home</NavLink>
              <NavLink to="/dashboard" onClick={onClose}>Dashboard</NavLink>
              <NavLink to="/workout-tracker" onClick={onClose}>Workout Tracker</NavLink>
              <NavLink to="/tips" onClick={onClose}>Tips</NavLink>
              
              {!user ? (
                <NavLink to="/authform" onClick={onClose}>
                  <Button 
                    rightIcon={<LogIn />} 
                    color="white" 
                    borderColor="white" 
                    variant="outline" 
                    w="full"
                  >
                    Login
                  </Button>
                </NavLink>
              ) : (
                <Button rightIcon={<LogOut />} colorScheme="red" onClick={() => { handleLogout(); onClose(); }} w="full">
                  Logout
                </Button>
              )}

              <IconButton
                icon={colorMode === 'light' ? <Moon /> : <Sun />}
                aria-label="Toggle theme"
                onClick={toggleColorMode}
                variant="ghost"
                color="white"
                _hover={{ bg: 'transparent' }}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;