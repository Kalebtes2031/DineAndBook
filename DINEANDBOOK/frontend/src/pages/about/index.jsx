import React from 'react';
import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react';

function About() {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4} textAlign="center">
        About Us
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} mb={4}>
        <Box flex="1" mb={{ base: 4, md: 0 }} pr={{ md: 4 }}>
          <Text mb={4}>
            Welcome to Kabth Restaurant, where culinary excellence meets warm hospitality. At Kabth, we take pride in offering a delightful dining experience that blends flavorful dishes with a cozy ambiance, perfect for any occasion.
          </Text>
          <Heading as="h3" size="md" mb={2}>
            Our Cuisine
          </Heading>
          <Text mb={4}>
            Indulge in a culinary journey inspired by global flavors. From our mouthwatering sushi selections to our authentic Italian pasta dishes, each bite at Kabth is a celebration of diverse tastes and high-quality ingredients. Whether you're craving the comforting flavors of tacos or the richness of Indian curry, our menu offers something to satisfy every palate.
          </Text>
          <Text mb={4}>
            The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.
          </Text>
          <Heading as="h3" size="md" mb={2}>
            Our Commitment to Excellence
          </Heading>
          <Text mb={4}>
            At Kabth Restaurant, we are dedicated to delivering exceptional service and exceeding your expectations with every visit. Our team of talented chefs crafts each dish with passion and precision, ensuring that every plate that leaves our kitchen is a masterpiece of flavor and presentation.
          </Text>
          <Heading as="h3" size="md" mb={2}>
            Reservations
          </Heading>
          <Text>
            Planning a special meal with friends or family? Reserve your table at Kabth Restaurant today! Simply fill out the form below with the number of guests and your preferred date and time, and we'll take care of the rest. Whether you're joining us for brunch on the weekend or a cozy dinner during the week, we look forward to welcoming you to Kabth.
          </Text>
        </Box>
        <Box flex="1" pl={{ md: 4 }}>
          <Image
            src="/restaurant_insidepic.jpg"
            alt="Restaurant inside view"
            borderRadius="md"
            objectFit="cover"
            boxShadow="md"
          />
          <Text mt={2} textAlign="center" fontSize="sm" color="gray.500">
            Come to Kabth Restaurant
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default About;
