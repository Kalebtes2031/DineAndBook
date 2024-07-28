import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Heading, Text, Button, Image, Spinner, Flex, Stack, Input } from "@chakra-ui/react";
import { fetchMenuItem, addToCart } from "../../hooks/useFetchQuery";
import { useUser } from "../../hooks/useUser";

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

  return (
    <Box p={6} maxW="800px" mx="auto" borderRadius="md" boxShadow="lg" bg="white">
      <Stack spacing={6}>
        <Heading size="lg" textAlign="center" color="teal.500">
          {data.title}
        </Heading>
        <Flex alignItems="center" justifyContent="space-between">
          <Box flex="1">
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Price: ${data.price}
            </Text>
            {user && (
              <Flex alignItems="center" mt={2}>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  width="60px"
                  mr={2}
                />
                <Button colorScheme="teal" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Flex>
            )}
          </Box>
          <Box flex="1" ml={6}>
            <Image
              src={imageUrl}
              alt={data.title}
              boxSize="400px"
              objectFit="cover"
              borderRadius="md"
              fallbackSrc="/img/default-placeholder.png"
              shadow="md"
            />
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export default MenuItem;
