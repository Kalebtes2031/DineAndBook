import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { submitBooking } from "../../hooks/useFetchQuery";

// Sample occasions data
const occasions = [
  { name: "Birthday", image: "/birthday.jpg" },
  { name: "Anniversary", image: "/anniversary.jpg" },
  { name: "Engagement", image: "/engagement.jpg" },
  { name: "Other", image: "/other.jpg" },
];

// Keyframes for scrollbar animation
const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

const BookingForm = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    people: 1,
    date: "",
    time: "",
    occasion: "",
    seating_preference: "",
    additional_comments: "",
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
        title: "Booking successful.",
        description: `Confirmation sent to ${response.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error:", error.response || error);
      toast({
        title: "An error occurred.",
        description: "Unable to complete booking.",
        status: "error",
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
        bg="#1c1c1b"
        borderRadius="md"
        boxShadow="sm"
        overflow="hidden"
        width="100vw"
        height="73vh"
        sx={{
          // Styling for custom scrollbar
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            background: "blue",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "red",
            borderRadius: "10px",
            transition: "background 0.3s ease",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "green",
          },
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "red yellow", // Firefox
        }}
      >
        {!selectedOccasion ? (
          <Box>
            <Text
              mt="30px"
              mb="30px"
              fontSize="36px"
              fontWeight="bold"
              fontStyle="italic"
              color="#b0b01e"
              textAlign=""
              animation={`${scrollAnimation} 10s linear infinite`}
            >
              Select Your Occasion
            </Text>
            <Box
              overflowX="auto"
              whiteSpace="nowrap"
              px="4"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "12px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "yellow",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "red",
                  borderRadius: "10px",
                  transition: "background 0.3s ease",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "blue",
                },
                scrollbarWidth: "thin",
                scrollbarColor: "#b0b01e #3d3d35",
                
              }}
            >
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                minWidth="2000px" // Ensure this is wider than the parent
                p={4}
                spacing={4}
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
                      transform: "scale(1.05)",
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
          <Flex p={3} bg="#14ba49" justifyContent="space-between">
            <Box width="30%">
              <Button
                onClick={goBack}
                
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
              px="6"
              py="2"
              width="60%"
              ml="40px"
              height="518px"
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

                    <FormControl isRequired mt="3">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Email</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired mt="3">
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

                    <FormControl isRequired mt="3">
                      <FormLabel>Time</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Occasion</FormLabel>
                      <Input
                        borderColor="#9AE6B4"
                        value={formData.occasion}
                        readOnly
                      />
                    </FormControl>

                    <FormControl mt="3">
                      <FormLabel>Seating Preference</FormLabel>
                      <Select
                        borderColor="#9AE6B4"
                        name="seating_preference"
                        value={formData.seating_preference}
                        onChange={handleChange}
                      >
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                      </Select>
                    </FormControl>

                    <FormControl mt="3">
                      <FormLabel>Additional Comments</FormLabel>
                      <Textarea
                        borderColor="#9AE6B4"
                        name="additional_comments"
                        value={formData.additional_comments}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                </Flex>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mt="4"
                  width="100%"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                >
                  Submit Booking
                </Button>
              </form>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default BookingForm;
