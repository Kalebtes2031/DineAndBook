import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  return (
    <Box py={12} px={6} maxW="800px" mx="auto" bg="gray.50" borderRadius="lg" shadow="md">
      <Heading as="h1" size="xl" textAlign="center" color="teal.700" mb={8}>
        Contact Us
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <VStack align="start" spacing={4} mb={{ base: 8, md: 0 }} px={4}>
          <Flex align="center">
            <Icon as={FaPhone} boxSize={5} color="teal.500" />
            <Text ml={2} fontSize="lg" color="gray.700">
              +1 234 567 890
            </Text>
          </Flex>
          <Flex align="center">
            <Icon as={FaEnvelope} boxSize={5} color="teal.500" />
            <Text ml={2} fontSize="lg" color="gray.700">
              contact@kabthrestaurant.com
            </Text>
          </Flex>
          <Flex align="center">
            <Icon as={FaMapMarkerAlt} boxSize={5} color="teal.500" />
            <Text ml={2} fontSize="lg" color="gray.700">
              123 Culinary Ave, Food City
            </Text>
          </Flex>
        </VStack>
        <Box flex={1} px={4}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input
                placeholder="Enter your name"
                focusBorderColor="teal.400"
                borderColor="gray.300"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                focusBorderColor="teal.400"
                borderColor="gray.300"
              />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Write your message"
                rows={5}
                focusBorderColor="teal.400"
                borderColor="gray.300"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              size="lg"
              width="full"
              _hover={{ bg: "teal.600" }}
              shadow="md"
            >
              Send Message
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default ContactUs;
