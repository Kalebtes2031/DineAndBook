// src/pages/Home.js
import React from "react";
import { Box, Heading, Text, Image, Link, Flex, Stack } from "@chakra-ui/react";
import { useUser } from "../../hooks/useUser";

const Home = () => {
  const { user } = useUser();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        id="hero"
        bgImage="linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('restaurant_insidepic.jpg')"
        bgSize="cover"
        bgPosition="75%"
        color="white"
        minH="200px"
        textAlign="center"
        p={8}
        mb={8}
      >
        <Heading
          fontSize="4xl"
          textShadow="2px 2px 4px #333"
          className="heading-shadow"
        >
          SPECIAL OFFER
        </Heading>
        <Text
          fontSize="2xl"
          mt={4}
          textShadow="2px 2px 4px #333"
        >
          30% Off This Weekend
        </Text>
        <Link
          href=""
          bg="transparent"
          color="rgba(255, 255, 255, 0.9)"
          border="3px solid #fff"
          p={2}
          fontWeight="bold"
          fontSize="1.5rem"
          textAlign="center"
          display="inline-block"
          mx={2}
          mt={4}
          _hover={{
            color: "#fff",
            bg: "#495E57",
            borderColor: "#495E57",
          }}
        >
          Book now
        </Link>
      </Box>

      {/* Content Section */}
      <Flex
        wrap="wrap"
        justify="space-between"
        p={6}
        mb={8}
        gap={6}
      >
        <Box
          flex="1"
          minW="300px"
          maxW="400px"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          textAlign="center"
        >
          <Heading as="h2" size="lg" mb={4}>
            Our New Menu
          </Heading>
          <Link href="/menu">
            <Image src="/menupic.jpg" alt="New Menu" borderRadius="md" />
          </Link>
          <Text mt={4}>
            Our menu consists of 12-15 seasonal items based on Italian, Indian, Japanese, American, French, Chinese, and Mexican culture.
          </Text>
          <Link href="/menu" color="teal.300" fontWeight="bold">
            See our new menu
          </Link>
        </Box>

        <Box
          flex="1"
          minW="300px"
          maxW="400px"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          textAlign="center"
        >
          <Heading as="h2" size="lg" mb={4}>
            Book a table
          </Heading>
          <Link href="">
            <Image src="/bookpic.jpg" alt="Book a Table" borderRadius="md" />
          </Link>
          <Text mt={4}>
            Reserve your table for an Italian, Indian, Japanese, American, French, Chinese, and Mexican dining experience.
          </Text>
          <Link href="" color="teal.300" fontWeight="bold">
            Book your table now
          </Link>
        </Box>

        <Box
          flex="1"
          minW="300px"
          maxW="400px"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          textAlign="center"
        >
          <Heading as="h2" size="lg" mb={4}>
            Opening Hours
          </Heading>
          <Image src="/chefpic.jpg" alt="Opening Hours" borderRadius="md" />
          <Text mt={4}>
            The Kabth Restaurant is open 7 days a week.
          </Text>
          <Flex direction="column" mt={4} textAlign="left">
            <Text>Mon - Fri: 7am - 10pm</Text>
            <Text>Sat: 9am - 12am</Text>
            <Text>Sun: 9am - 11pm</Text>
          </Flex>
        </Box>
      </Flex>

      {/* Welcome Message */}
      <Box mt={8} px={6}>
        <Heading
          ml="4"
          textShadow="2xl"
          fontFamily="cursive"
          color="rgba(245, 226, 197, 1)"
        >
          Welcome home,{" "}
          {user.first_name
            ? `${user.first_name} ${user.last_name}`
            : user.username.toUpperCase()}
        </Heading>
      </Box>
    </Box>
  );
};

export default Home;
