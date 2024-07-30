import React, { useState, useRef, useEffect } from "react";
import { Flex, Image, Stack, Text, Icon, Box } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineContactPhone } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { removeTokens } from "../hooks/useFetchQuery";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [activeItem, setActiveItem] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    setUser({});
    removeTokens();
    navigate("/auth/login/");
  };

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Booking", path: "/booking" },
    { name: "About", path: "/about" },
    { name: "Orders", path: "/orders" },
    { name: "Cart", path: "/cart" },
  ];

  const firstLetter = user.username ? user.username.charAt(0).toUpperCase() : "";

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
          boxSize="20"
          borderRadius="full"
          border="2px solid teal"
          boxShadow="lg"
          objectFit="cover"
          objectPosition="center"
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
        color="#e6ebe6"
        fontWeight="bold"
      >
        {menuItems.map((item) => (
          <Text
            key={item.name}
            cursor="pointer"
            onClick={() => handleItemClick(item.name, item.path)}
            transition="transform 0.3s ease"
            color={activeItem === item.name ? "#EDF2F7" : "#e6ebe6"}
            transform={activeItem === item.name ? "scale(1.05)" : "scale(1)"}
            textDecor={activeItem === item.name ? "underline" : "none"}
            _hover={{ color: "#EDF2F7", transform: "scale(1.05)" }}
          >
            {item.name}
          </Text>
        ))}
      </Stack>

      <Flex align="center" position="relative">
        <Box
          ref={dropdownRef}
          onClick={toggleDropdown}
          bg="gray.100"
          w="40px"
          h="40px"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="gray.700"
          fontWeight="bold"
          cursor="pointer"
          _hover={{ bg: "gray.300" }}
        >
          {firstLetter}
        </Box>
        {dropdownOpen && (
          <Box
            position="absolute"
            top="35px"
            right="2"
            mt="10px"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
            zIndex="10"
            w="150px"
            fontFamily="cursive"
          >
            <Flex
              align="center"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
            >
            <Icon as={MdOutlineContactPhone} boxSize="6" ml="13px" />
            <Text
              onClick={() => handleItemClick("Contact Us", "/contact")}
              px={3}
              py={2}
              cursor="pointer"
            >
              Contact Us
            </Text>
            </Flex>
            <Flex 
              align="center"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}

            >
             <Icon as={FiLogOut} boxSize="6" ml="16px" px={1} mr="3px"
              py={1} />
              <Text
              onClick={handleLogOut}
              px={2}
              py={2}
            >
              Logout
            </Text>
            </Flex>
            
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
