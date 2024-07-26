// src/components/Layout.js
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1" >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
