import React from 'react';
import { Box, Flex, Text, Link, Stack, useBreakpointValue, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={8} px={{ base: 4, md: 8 }} borderTop="1px solid #4A5568">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        wrap="wrap"
      >
        <Stack spacing={4} align={{ base: 'center', md: 'start' }} mb={{ base: 6, md: 0 }}>
          <Text fontSize="xl" fontWeight="bold" textAlign={{ base: 'center', md: 'left' }}>
            Kabth Restaurant
          </Text>
          <Text textAlign={{ base: 'center', md: 'left' }}>
            123 Culinary St, Gourmet City, CA 98765
          </Text>
          <Text textAlign={{ base: 'center', md: 'left' }}>
            © {new Date().getFullYear()} Kabth Restaurant. All rights reserved.
          </Text>
        </Stack>
        <Stack
          direction="row"
          spacing={4}
          justify={{ base: 'center', md: 'end' }}
          mb={{ base: 6, md: 0 }}
        >
          <Link href="https://www.facebook.com" isExternal>
            <Icon as={FaFacebookF} boxSize={{ base: 6, md: 8 }} _hover={{ color: 'facebook.400' }} />
          </Link>
          <Link href="https://www.twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize={{ base: 6, md: 8 }} _hover={{ color: 'twitter.400' }} />
          </Link>
          <Link href="https://www.instagram.com" isExternal>
            <Icon as={FaInstagram} boxSize={{ base: 6, md: 8 }} _hover={{ color: 'pink.400' }} />
          </Link>
          <Link href="https://www.linkedin.com" isExternal>
            <Icon as={FaLinkedinIn} boxSize={{ base: 6, md: 8 }} _hover={{ color: 'linkedin.400' }} />
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
