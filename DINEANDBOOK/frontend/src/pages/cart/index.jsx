import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Text,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  placeOrder,
} from '../../hooks/useFetchQuery';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        const data = await fetchCartItems();
        setCartItems(data);
        console.log("i need this:", data)
      } catch (error) {
        toast({
          title: 'Error loading cart items.',
          description: 'Could not fetch cart items.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [toast]);

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      setLoading(true);
      console.log(`Updating item with id: ${id}, quantity: ${newQuantity}`);
  
      // Check if quantity is valid
      if (newQuantity < 1) {
        toast({
          title: 'Invalid quantity.',
          description: 'Quantity must be at least 1.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      // Update the item in the backend
      const updatedItem = await updateCartItem(id, newQuantity);
      console.log('Updated item from backend:', updatedItem); // Debugging line
  
      // Check if the updatedItem contains expected data
      if (!updatedItem || !('id' in updatedItem)) {
        throw new Error('Incomplete item data received.');
      }
  
      // Update the cart items in the state
      setCartItems((items) =>
        items.map((item) => (item.id === id ? updatedItem : item))
      );
  
      toast({
        title: 'Quantity updated.',
        description: 'The quantity has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to update cart item', error); // Log error for debugging
      toast({
        title: 'Error updating quantity.',
        description: 'Could not update the item quantity.',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handleRemove = async (id) => {
    try {
      setLoading(true);
      await removeCartItem(id);
      setCartItems((items) => items.filter((item) => item.id !== id));
      toast({
        title: 'Item removed.',
        description: 'The item has been removed from the cart.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error removing item.',
        description: 'Could not remove the item from the cart.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      await placeOrder();
      toast({
        title: 'Order placed.',
        description: 'Your order has been placed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/orders');
    } catch (error) {
      toast({
        title: 'Error placing order.',
        description: 'Could not place the order.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={5}>
        Cart
      </Heading>
      {loading && <Spinner size="xl" />}
      {cartItems.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Total Price</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>
                  <Flex align="center">
                    <IconButton
                      icon={<MinusIcon />}
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      mr={2}
                    />
                    <Input
                      value={item.quantity}
                      readOnly
                      width="50px"
                      textAlign="center"
                    />
                    <IconButton
                      icon={<AddIcon />}
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      ml={2}
                    />
                  </Flex>
                </Td>
                <Td>${parseFloat(item.unit_price).toFixed(2)}</Td>
                <Td>${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleRemove(item.id)}
                    size="sm"
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Box  p={5} bg="#f9f9f9">
          <Box
            maxW="1200px"
            m="0 auto"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            overflow="hidden"
            p={5}
            width="100vw" height="60vh"
          >
            <Text 
              mt="80px"
              fontSize="36px"
              fontWeight="bold"
              fontStyle="italic" 
              color="gray.700" 
              textAlign="center">
              Your cart is empty. Add items to your cart to place an order.
            </Text>
          </Box>
        </Box>


      )}
      {cartItems.length > 0 && (
        <Button
          colorScheme="green"
          mt={5}
          onClick={handlePlaceOrder}
          isLoading={loading}
        >
          Place Order
        </Button>
      )}
      {cartItems.length > 0 && (
        <Link to="/menu/">
        <Button
          mt={5}
          ml={8}
          colorScheme='teal'
          
        >
          Add Other Menu Items
        </Button>
      </Link>
      )}
      
      
    </Box>
  );
};

export default Cart;
