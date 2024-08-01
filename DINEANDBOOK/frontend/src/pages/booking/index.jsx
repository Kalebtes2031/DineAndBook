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
  useBreakpointValue,
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
        position: "top",
      });
      setSelectedOccasion(null);
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

  const formWidth = useBreakpointValue({ base: "100%", md: "60%" });

  return (
    <Box p={4} bg="white" height="100vh" overflow="auto">
      <Box
        maxW="1500px"
        m="0 auto"
        bg="#1c1c1b"
        borderRadius="md"
        boxShadow="sm"
        overflow="hidden"
        height="100%"
        sx={{
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
              fontSize={{ base: "24px", md: "36px" }}
              fontWeight="bold"
              fontStyle="italic"
              color="#b0b01e"
              textAlign="center"
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
                minWidth="2000px"
                p={4}
                spacing={4}
              >
                {occasions.map((occasion) => (
                  <Box
                    key={occasion.name}
                    onClick={() => selectOccasion(occasion)}
                    cursor="pointer"
                    width={{ base: "300px", md: "550px" }}
                    height={{ base: "200px", md: "350px" }}
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
          <Flex
            direction={{ base: "column", md: "row" }}
            p={3}
            bgImage="url('/bganniversary3.jpg')"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            justifyContent="space-between"
            width="100%"
            height="100%"
          >
            <Box width={{ base: "100%", md: "30%" }}>
              <Button
                onClick={goBack}
                mb="4"
                leftIcon={<IoMdArrowRoundBack />}
                alignSelf="flex-start"
              >
                Back
              </Button>
              <Image
                ml={{ base: "0", md: "40px" }}
                mt="10px"
                src={selectedOccasion.image}
                alt={selectedOccasion.name}
                borderRadius="md"
                border="1px solid gray"
                width={{ base: "100%", md: "500px" }}
                height={{ base: "250px", md: "400px" }}
                _hover={{
                  transform: "scale(1.05)",
                }}
              />
              <Box
                bottom="0"
                width="100%"
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                textAlign="center"
                py="2"
                fontWeight="bold"
                ml={{ base: "0", md: "40px" }}
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
              bg="white"
              borderColor="teal.400"
              px="6"
              py="2"
              width={formWidth}
              ml={{ base: "0", md: "40px" }}
              mt={{ base: "4", md: "0" }}
              height="auto"
            >
              <form onSubmit={handleSubmit}>
                <Flex direction={{ base: "column", md: "row" }}>
                  <Box textStyle="menu" width={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "2" }}>
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        borderColor="#cfcf21"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        borderColor="#cfcf21"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Email</FormLabel>
                      <Input
                        borderColor="#cfcf21"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        borderColor="#cfcf21"
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                  <Box textStyle="menu" width={{ base: "100%", md: "50%" }} pl={{ base: "0", md: "2" }}>
                    <FormControl isRequired>
                      <FormLabel>Number of People</FormLabel>
                      <Select
                        borderColor="#cfcf21"
                        name="people"
                        value={formData.people}
                        onChange={handleChange}
                      >
                        {[...Array(10).keys()].map((n) => (
                          <option key={n + 1} value={n + 1}>
                            {n + 1}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Date</FormLabel>
                      <Input
                        borderColor="#cfcf21"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl isRequired mt="3">
                      <FormLabel>Time</FormLabel>
                      <Input
                        borderColor="#cfcf21"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl mt="3">
                      <FormLabel>Seating Preference</FormLabel>
                      <Select
                        borderColor="#cfcf21"
                        name="seating_preference"
                        value={formData.seating_preference}
                        onChange={handleChange}
                      >
                        <option value="">No Preference</option>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                      </Select>
                    </FormControl>
                  </Box>
                </Flex>

                <FormControl mt="3">
                  <FormLabel>Additional Comments</FormLabel>
                  <Textarea
                    borderColor="#cfcf21"
                    name="additional_comments"
                    value={formData.additional_comments}
                    onChange={handleChange}
                  />
                </FormControl>

                <Button
                  mt="4"
                  colorScheme="teal"
                  type="submit"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="bold"
                  width="100%"
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
