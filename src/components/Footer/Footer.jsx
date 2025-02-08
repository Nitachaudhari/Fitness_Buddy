import React from "react";
import { Box, Container, Stack, Text, Link, Icon, HStack, Divider } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Footer = () => {
    const navigate = useNavigate()
    return (
        <Box as="footer" bg="blue.500" color="white" py={{ base: 8, md: 12 }}>
            <Container maxW="container.xl">
                <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 10, md: 20 }} justify="space-between">
                    {/* Left Section - Logo and Links */}
                    <Box flex="" mb={{ base: 6, md: 0 }}>
                        <Text fontSize="3xl" fontWeight="bold" letterSpacing="wider" color="black">
                            Fitness Buddy
                        </Text>
                        <Stack spacing={4} mt={6}>
                            <Text fontSize="lg" color="white" _hover={{ textDecoration: "underline", color: "teal.300" }}
                            onClick={() => navigate('/about')} >About us</Text>
                            <Text fontSize="lg" color="white" _hover={{ textDecoration: "underline", color: "teal.300" }}
                            onClick={() => navigate('/contact')} >Contact us</Text>
                            <Text fontSize="lg" color="white" _hover={{ textDecoration: "underline", color: "teal.300" }}
                            onClick={() => navigate('/about')} >Privacy Policy</Text>
                            <Text fontSize="lg" color="white" _hover={{ textDecoration: "underline", color: "teal.300" }}
                            onClick={() => navigate('/about')} >Terms of Use</Text>
                        </Stack>
                    </Box>

                    {/* Center Section - Contact Information */}
                    <Box flex="1" mb={{ base: 6, md: 0 }}>
                        <Text fontSize="xl" fontWeight="bold" mb={4} color="black">
                            Contact Information
                        </Text>
                        <Stack spacing={3} color="white">
                            <Text fontSize="lg">Email: support@fitnessbuddy.com</Text>
                            <Text fontSize="lg">Phone: (123) 456-7890</Text>
                            <Text fontSize="lg">Address: 123 Fitness St, Wellness City, Country</Text>
                        </Stack>
                    </Box>

                    {/* Right Section - Social Media */}
                    <Box flex="" textAlign={{ base: "center", md: "right" }}>
                        <Text fontSize="xl" fontWeight="bold" mb={4} color="black">
                            Follow Us
                        </Text>
                        <HStack spacing={6} justify="center" mb={6} align="center">
                            <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                                <Icon as={FaFacebookF} boxSize={8} _hover={{ color: "teal.300" }} />
                            </Link>
                            <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                                <Icon as={FaInstagram} boxSize={8} _hover={{ color: "teal.300" }} />
                            </Link>
                            <Link href="https://www.twitter.com" target="_blank" aria-label="Twitter">
                                <Icon as={FaTwitter} boxSize={8} _hover={{ color: "teal.300" }} />
                            </Link>
                        </HStack>
                    </Box>
                </Stack>
                <Divider my={6} borderColor="gray.600" />
                <Text textAlign="center" fontSize="sm" opacity={0.7} color="white">
                    © 2025 Fitness Buddy. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
};

export default Footer;
