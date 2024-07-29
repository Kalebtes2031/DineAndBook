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
      bg="#242624"
      w="100%"
      h="90px"
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
        color="#e6ebe6"
        textDecor="none"
        fontWeight="bold"
        
        >
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/")}
            transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)", textDecor: "underline" }}
      
            >
          Home
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/menu")}
            transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)", textDecor: "underline" }}            >
          Menu
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/booking")}
            transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)", textDecor: "underline" }}
            >
          Booking
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/about")}
            transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)", textDecor: "underline" }}            >
          About
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/orders")}
            transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)", textDecor: "underline" }}            >
          Orders
        </Text>
        <Text 
            cursor="pointer" 
            onClick={() => navigate("/cart")}
            transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)", textDecor: "underline" }}            >
          Cart
        </Text>
      </Stack>
      <Flex 
        color="#e6ebe6"
        gap={2} 
        onClick={handleLogOut} 
        align="center" 
        cursor="pointer"
        transition="transform 0.3s ease"
            _hover={{ color: "#EDF2F7",transform: "scale(1.05)" }}
        >
        <Icon as={FiLogOut} boxSize="6" />
        <Text fontFamily="unset" fontWeight="bold">Logout</Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
