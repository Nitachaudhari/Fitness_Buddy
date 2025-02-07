import React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Input,
  SimpleGrid,
  Heading,
  Text,
  Button,
  VStack,
  AspectRatio,
  Card,
  CardBody,
  IconButton,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon, SunIcon, MoonIcon, ArrowBackIcon } from '@chakra-ui/icons';
import fitnessResources from './../../data/dataset';

const FitnessLibrary = () => {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  const filteredResources = fitnessResources.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const videos = filteredResources.filter(item => item.type === "video");
  const articles = filteredResources.filter(item => item.type === "article");

  if (selectedArticle) {
    return <DetailView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading
            size={headingSize}
            bgGradient="linear(to-r, blue.400, teal.400)"
            bgClip="text"
          >
            Virtual Fitness Library
          </Heading>
          <IconButton
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size={buttonSize}
            aria-label="Toggle color mode"
          />
        </Box>

        {/* Search */}
        <InputGroup size={buttonSize} maxW="600px" mx="auto">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search videos and articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="filled"
          />
        </InputGroup>

        {/* Videos Section */}
        <Box as="section">
          <Heading size="lg" mb={6}>
            Workout Videos ({videos.length})
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {videos.map(video => (
              <Card key={video.id} shadow="md" _hover={{ shadow: "lg" }}>
                <CardBody>
                  <AspectRatio ratio={16 / 9} mb={4}>
                    <iframe
                      src={video.url}
                      title={video.title}
                      allowFullScreen
                    />
                  </AspectRatio>
                  <Heading size="md" mb={2} noOfLines={2}>
                    {video.title}
                  </Heading>
                  <Text color="gray.600" _dark={{ color: "gray.300" }}>
                    {video.description}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Articles Section */}
        <Box as="section">
          <Heading size="lg" mb={6}>
            Fitness Articles ({articles.length})
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {articles.map(article => (
              <Card key={article.id} shadow="md" _hover={{ shadow: "lg" }}>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">{article.title}</Heading>
                    <Text noOfLines={3} color="gray.600" _dark={{ color: "gray.300" }}>
                      {article.description}
                    </Text>
                    <Button
                      colorScheme="blue"
                      onClick={() => setSelectedArticle(article)}
                      alignSelf="flex-start"
                    >
                      Read More
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

const DetailView = ({ article, onBack }) => {
    return (
      <Container maxW="container.lg" py={8}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          mb={6}
          onClick={onBack}
        >
          Back to Library
        </Button>
  
        <Card shadow="md" p={8}>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <Heading size="xl">{article.title}</Heading>
  
              {/* Display Article Image */}
              {article.image && (
                <Box>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "50%",height:"100%", borderRadius: "8px" , display:"block", margin:"auto"}}
                  />
                </Box>
              )}
  
              {/* Display Article Description with Formatting */}
              <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }} whiteSpace="pre-line">
                {article.description}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    );
  };
  
  

export default FitnessLibrary;