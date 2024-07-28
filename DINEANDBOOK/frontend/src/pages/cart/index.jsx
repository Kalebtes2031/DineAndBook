// src/components/Cart.jsx

import React from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text } from '@chakra-ui/react';
import { fetchCartItems, placeOrder } from '../../hooks/useFetchQuery';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { data: cartItems, isLoading, isError } = useQuery('cartItems', fetchCartItems);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      navigate('/orders');
    } catch (error) {
      console.error('Failed to place order', error);
      alert('Failed to place order');
    }
  };

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <p>Error fetching cart items</p>;

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Text fontSize="2xl" mb={4}>
        Your Cart
      </Text>
      {cartItems.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Menu Item</Th>
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Total Price</Th>
              <Th>Update</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map((item) => (
              <Tr key={item.id}>
                <Td>{item.menuitem.title}</Td>
                <Td>{item.quantity}</Td>
                <Td>${item.menuitem.price}</Td>
                <Td>${item.price}</Td>
                <Td>
                  <Button colorScheme="blue">Update</Button>
                </Td>
                <Td>
                  <Button colorScheme="red">Remove</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>Your cart is empty. Add items to your cart to place an order.</Text>
      )}
      <Button colorScheme="teal" mt={4} onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Box>
  );
};

export default Cart;
