// src/components/Navbar.js
import { Flex, Image, Stack, Text, Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { removeTokens } from "../hooks/useFetchQuery";


const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogOut = () => {
    setUser({});
    removeTokens();
    navigate("/auth/login/");
  };

  return (
    <Flex
      as="nav"
      bg="#48cf53"
      w="100%"
      h="80px"
      py={2}
      px={6}
      justify="space-between"
      align="center"
    >
      <Link to="/">
      <Image 
        src="/logopic.png" 
        boxSize="20" // Increase the size for better visibility
        borderRadius="full"
        border="2px solid teal"
        boxShadow="lg"
        objectFit="cover"
        objectPosition="center" // Center the focus of the image
        transition="transform 0.2s ease-in-out"
        _hover={{
          transform: "scale(1.1)",
          boxShadow: "xl",
        }}
        alt="Logo"
      />
      </Link>
      
      <Stack 
        direction="row" 
        spacing={16}
        fontSize="20px"
        fontFamily="cursive"
        variant="text"
        size="lg"
        color="white"
        textDecor="none"
        fontWeight="bold"
        >
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/")}
            _hover={{ color: "#EDF2F7", textDecor: "underline" }}
            >
          Home
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/menu")}
            _hover={{ color: "#EDF2F7", textDecor: "underline" }}
            >
          Menu
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/booking")}
            _hover={{ color: "#EDF2F7", textDecor: "underline" }}
            >
          Booking
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/about")}
            _hover={{ color: "#EDF2F7", textDecor: "underline" }}
            >
          About
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/orders")}
            _hover={{ color: "#EDF2F7", textDecor: "underline" }}
            >
          Orders
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/cart")}
            _hover={{ color: "#EDF2F7", textDecor: "underline" }}
            >
          Cart
        </Text>
      </Stack>
      <Flex gap={2} onClick={handleLogOut} align="center" cursor="pointer">
        <Icon as={FiLogOut} boxSize="6" />
        <Text fontFamily="unset" fontWeight="bold">Logout</Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
