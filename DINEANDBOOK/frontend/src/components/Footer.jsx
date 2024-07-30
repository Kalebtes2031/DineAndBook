import React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  IconButton,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="#242624" color="white" py={10} px={6}>
      <VStack spacing={8} align="start" maxW="1200px" mx="auto">
        <Flex justify="space-between" w="100%" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="teal.400">
            Kabth Restaurant
          </Text>
          <Stack direction="row" spacing={6}>
            {/* <Link href="#" _hover={{ color: "teal.300" }}>
              Home
            </Link>
            <Link href="#" _hover={{ color: "teal.300" }}>
              Menu
            </Link>
            <Link href="#" _hover={{ color: "teal.300" }}>
              Booking
            </Link>
            <Link href="#" _hover={{ color: "teal.300" }}>
              About
            </Link> */}
            <Link href="/contact" _hover={{ color: "teal.300" }}>
              Contact Us
            </Link>
          </Stack>
        </Flex>
        <Divider borderColor="teal.400" />
        <Flex justify="space-between" w="100%" align="center">
          <Text fontSize="sm">
            © {new Date().getFullYear()} Kabth Restaurant. All rights reserved.
          </Text>
          <Stack direction="row" spacing={4}>
            <IconButton
              as="a"
              href="#"
              aria-label="Facebook"
              icon={<FaFacebookF />}
              bg="teal.500"
              color="white"
              _hover={{ bg: "teal.300" }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter />}
              bg="teal.500"
              color="white"
              _hover={{ bg: "teal.300" }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FaInstagram />}
              bg="teal.500"
              color="white"
              _hover={{ bg: "teal.300" }}
            />
          </Stack>
        </Flex>
        <Box textAlign="center" mt={6}>
          <Text fontSize="sm">
            1234 Culinary Road, Flavor Town, FT 56789 | (123) 456-7890
          </Text>
          <Text fontSize="sm">info@kabthrestaurant.com</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Footer;
