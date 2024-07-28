import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  Image,
  Text,
  keyframes,
  Flex,
} from '@chakra-ui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { submitBooking } from '../../hooks/useFetchQuery';

const occasions = [
  { name: 'Birthday', image: '/birthday.jpg' },
  { name: 'Anniversary', image: '/anniversary.jpg' },
  { name: 'Engagement', image: '/engagement.jpg' },
  { name: 'Other', image: '/other.jpg' },
];

const scrollAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const textAnimation = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const BookingForm = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    people: 1,
    date: '',
    time: '',
    occasion: '',
    seating_preference: '',
    additional_comments: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitBooking(formData);
      toast({
        title: 'Booking successful.',
        description: `Confirmation sent to ${response.message}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error:', error.response || error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to complete booking.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const selectOccasion = (occasion) => {
    setSelectedOccasion(occasion);
    setFormData((prevData) => ({ ...prevData, occasion: occasion.name }));
  };

  const goBack = () => {
    setSelectedOccasion(null);
  };

  return (
    <Box p={4} bg="white">
      <Box
        maxW="1500px"
        m="0 auto"
        bg="white"
        borderRadius="md"
        boxShadow="sm"
        overflow="hidden"
        width="100vw"
        height="72vh"
      >
        {!selectedOccasion ? (
          <Box>
            <Text
              mt="30px"
              mb="30px"
              fontSize="36px"
              fontWeight="bold"
              fontStyle="italic"
              color="gray.700"
              textAlign="center"
              animation={`${textAnimation} 2s ease-in-out infinite`}
            >
              Select Your Occasion
            </Text>
            <Box
              overflowX="auto"
              whiteSpace="nowrap"
              px="4"
              py="4"
              css={{
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                {occasions.map((occasion) => (
                  <Box
                    key={occasion.name}
                    onClick={() => selectOccasion(occasion)}
                    cursor="pointer"
                    width="550px"
                    height="350px"
                    overflow="hidden"
                    position="relative"
                    borderRadius="md"
                    mx="2"
                    transition="transform 0.3s ease"
                    _hover={{
                      transform: 'scale(1.05)',
                      animation: `${scrollAnimation} 1.5s ease-in-out infinite`,
                    }}
                    flexShrink="0"
                  >
                    <Image
                      src={occasion.image}
                      alt={occasion.name}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                    <Box
                      position="absolute"
                      bottom="0"
                      width="100%"
                      bg="rgba(0, 0, 0, 0.5)"
                      color="white"
                      textAlign="center"
                      py="2"
                      fontWeight="bold"
                    >
                      {occasion.name}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Flex p={5} bg="#f9f9f9" justifyContent="space-between">
            <Box width="30%">
              <Button
                onClick={goBack}
                colorScheme="blue"
                mb="4"
                leftIcon={<IoMdArrowRoundBack />}
                alignSelf="flex-start"
              >
                Back
              </Button>
              <Image
                ml="40px"
                mt="10px"
                src={selectedOccasion.image}
                alt={selectedOccasion.name}
                borderRadius="md"
                width="500px"
                height="400px"
              />
              <Box
                bottom="0"
                width="100%"
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                textAlign="center"
                py="2"
                fontWeight="bold"
                ml="40px"
                mt="5px"
                borderRadius="md"
              >
                {selectedOccasion.name}
              </Box>
            </Box>
            <Box
              borderWidth="1px"
              borderRadius="md"
              boxShadow="lg"
              bgGradient="linear(to-br, teal.50, blue.100)"
              borderColor="teal.400"
              p="6"
              width="60%"
              ml="40px"
              mt=""
              mb=""
              height="512px"
            >
              <form onSubmit={handleSubmit}>
                <Flex>
                  <Box width="50%" pr="2">
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="4">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="4">
                      <FormLabel>Email</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="4">
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired mt="4">
                      <FormLabel>Number of People</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        type="number"
                        name="people"
                        value={formData.people}
                        onChange={handleChange}
                        min={1}
                      />
                    </FormControl>
                  </Box>
                  <Box width="50%" pl="2">

                    <FormControl isRequired mt="">
                      <FormLabel>Date</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="4">
                      <FormLabel>Time</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl mt="4">
                      <FormLabel>Seating Preferences</FormLabel>
                      <Select
                        borderColor="#9AE6B4"
                        name="seating_preference"
                        value={formData.seating_preference}
                        onChange={handleChange}
                      >
                        <option value="None">None</option>
                        <option value="Indoors">Indoors</option>
                        <option value="Patio">Outdoor (Patio)</option>
                        <option value="Sidewalk">Outdoor (Sidewalk)</option>
                      </Select>
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel>Additional Comments</FormLabel>
                      <Textarea
                        borderColor="#9AE6B4"
                        name="additional_comments"
                        value={formData.additional_comments}
                        onChange={handleChange}
                        rows={4}

                      />
                    </FormControl>
                    <Button
                      colorScheme="teal"
                      mt="9"
                      type="submit"
                      alignSelf="flex-end"
                      width="140px"
                    >
                      Submit
                    </Button>
                  </Box>
                </Flex>
              </form>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default BookingForm;
