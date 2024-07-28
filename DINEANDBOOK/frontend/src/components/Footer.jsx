// src/components/Footer.js
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#EDEFEE"
      w="100%"
      h="50px"
      py={2}
      px={6}
      mt="auto"
      textAlign="center"
      position="relative"
    >
      <Text fontSize="sm">© 2024 Kabth Restaurant. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
