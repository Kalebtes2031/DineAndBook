import React, { useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Spinner,
  Flex,
  Stack,
  Input,
  Tag,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { fetchMenuItem, addToCart } from "../../hooks/useFetchQuery";
import { useUser } from "../../hooks/useUser";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IoMdArrowRoundBack } from "react-icons/io";

const MenuItem = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(["menuItem", id], () => fetchMenuItem(id));
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <p>Error fetching menu item</p>;

  const imageUrl = `/${data.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;

  const handleAddToCart = async () => {
    try {
      await addToCart(data.id, quantity);
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add item to cart", error);
      alert("Failed to add item to cart");
    }
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue <= 0) {
      setQuantity(1);
    } else {
      setQuantity(newValue);
    }
  };

  return (
    <Box
      p={8}
      maxW="800px"
      mx="auto"
      borderRadius="lg"
      boxShadow="2xl"
      bg="white"
      overflow="hidden"
      fontFamily="'Spline Sans Mono', sans-serif"
    >
      <Link to="/menu">
        <Box fontSize="25px">
          <IoMdArrowRoundBack color="teal"/>
        </Box>  
      </Link>
      <Stack spacing={8}>
        <Heading
          size="lg"
          textAlign="center"
          color="teal.600"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={4}
        >
          {data.title}
        </Heading>
        
        <HStack justifyContent="center" mb={4}>
          <Tag size="lg" colorScheme="teal" variant="outline">
            Popular
          </Tag>
          <Tag size="lg" colorScheme="orange" variant="outline">
            Chef's Special
          </Tag>
        </HStack>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection={["column", "row"]}
        >
          <Box flex="1" maxW="50%">
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              Price: <Text as="span" color="teal.600">${data.price}</Text>
            </Text>
            {user && (
              <Box>
                <Flex alignItems="center" mt={4}>
                  <IconButton
                    icon={<MinusIcon />}
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    aria-label="Decrease quantity"
                    colorScheme="teal"
                    borderRadius="full"
                    mr={2}
                  />
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    width="70px"
                    mr={2}
                    borderRadius="full"
                    borderColor="teal.500"
                    _focus={{
                      borderColor: "teal.300",
                    }}
                  />
                  <IconButton
                    icon={<AddIcon />}
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    colorScheme="teal"
                    borderRadius="full"
                    mr={2}
                  />
                </Flex>
                  <Button
                    colorScheme="teal"
                    mt="15px"
                    onClick={handleAddToCart}
                    borderRadius="full"
                    px={6}
                    _hover={{
                      bg: "teal.400",
                    }}
                  >
                    Add to Cart
                  </Button>
              </Box>
            )}
          </Box>
          <Box flex="1" maxW="50%" ml={[0, 6]} mt={[6, 0]}>
            <Image
              src={imageUrl}
              alt={data.title}
              width="100%"
              maxW="400px"
              objectFit="cover"
              borderRadius="md"
              fallbackSrc="/img/default-placeholder.png"
              shadow="md"
              mx="auto"
              transform="scale(1)"
              transition="transform 0.3s"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
        </Flex>
        
        <Box
          height="4px"
          bgGradient="linear(to-r, teal.400, teal.600)"
          borderRadius="md"
          my={4}
        />
        
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Enjoy a delightful experience with our {data.title}. Perfectly crafted to satisfy your cravings!
        </Text>
      </Stack>
    </Box>
  );
};

export default MenuItem;
