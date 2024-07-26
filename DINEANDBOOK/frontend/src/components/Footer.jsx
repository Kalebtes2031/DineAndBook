// src/components/Footer.js
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#88D66C"
      w="100%"
      h="50px"
      py={2}
      px={6}
      mt="auto"
      textAlign="center"
    >
      <Text fontSize="sm">© 2024 Kabth Restaurant. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
