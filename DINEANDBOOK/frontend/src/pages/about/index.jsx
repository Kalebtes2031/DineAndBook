import React from 'react';
import { Box, Heading, Text, Flex, Image, VStack, Divider } from '@chakra-ui/react';

function About() {
  return (
    <Box
      p={6}
      bg="gray.50"
      borderRadius="md"
      shadow="lg"
      bgImage="url('/about-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      fontFamily="'Spline Sans Mono', sans-serif"
    >
      <VStack spacing={8} align="center" maxW="800px" mx="auto">
        <Heading as="h1" size="2xl" mt="80px" color="teal.600" textAlign="center">
          About Us
        </Heading>
        <Flex direction={{ base: 'column', md: 'row' }} width="100%">
          <Box flex="1" mb={{ base: 8, md: 0 }} pr={{ md: 6 }} textAlign="left">
            <Image
              src="/restaurant_insidepic.jpg"
              alt="Restaurant inside view"
              borderRadius="lg"
              objectFit="cover"
              boxShadow="lg"
              mb={{ base: 4, md: 4 }}
              w={{ base: "100%", md: "50%" }}
              float={{ md: 'left' }}
              mr={{ md: 6 }}
            />
            <Text fontSize="lg" mb={6} lineHeight="tall" color="gray.700">
              Welcome to Kabth Restaurant, where culinary excellence meets warm hospitality. At Kabth, we take pride in offering a delightful dining experience that blends flavorful dishes with a cozy ambiance, perfect for any occasion.
            </Text>
            <Heading as="h3" size="lg" my={4} color="teal.500">
              Our Cuisine
            </Heading>
            <Text fontSize="lg" mb={6} lineHeight="tall" color="gray.700">
              Indulge in a culinary journey inspired by global flavors. From our mouthwatering sushi selections to our authentic Italian pasta dishes, each bite at Kabth is a celebration of diverse tastes and high-quality ingredients. Whether you're craving the comforting flavors of tacos or the richness of Indian curry, our menu offers something to satisfy every palate.
            </Text>
            <Text fontSize="lg" mb={6} lineHeight="tall" color="gray.700">
              The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.
            </Text>
            <Heading as="h3" size="lg" my={4} color="teal.500">
              Our Commitment to Excellence
            </Heading>
            <Text fontSize="lg" mb={6} lineHeight="tall" color="gray.700">
              At Kabth Restaurant, we are dedicated to delivering exceptional service and exceeding your expectations with every visit. Our team of talented chefs crafts each dish with passion and precision, ensuring that every plate that leaves our kitchen is a masterpiece of flavor and presentation.
            </Text>
            <Heading as="h3" size="lg" my={4} color="teal.500">
              Reservations
            </Heading>
            <Text fontSize="lg" color="gray.700">
              Planning a special meal with friends or family? Reserve your table at Kabth Restaurant today! Simply fill out the form below with the number of guests and your preferred date and time, and we'll take care of the rest. Whether you're joining us for brunch on the weekend or a cozy dinner during the week, we look forward to welcoming you to Kabth.
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}

export default About;
