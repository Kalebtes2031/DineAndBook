// src/components/Orders.jsx

import React from 'react';
import { useQuery } from 'react-query';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, Button } from '@chakra-ui/react';
import { fetchOrders } from '../../hooks/useFetchQuery';

const Orders = () => {
  const { data: orders, isLoading, isError } = useQuery('orders', fetchOrders);

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <p>Error fetching orders</p>;

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Text fontSize="2xl" mb={4}>
        Your Orders
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Date</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Details</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.date}</Td>
                <Td>${order.total}</Td>
                <Td>{order.status ? 'Ordered' : 'Pending'}</Td>
                <Td>
                  <Button colorScheme="blue">View Details</Button>
                </Td>
                <Td>
                  {order.status ? (
                    <Text>Already ordered.</Text>
                  ) : (
                    <Button colorScheme="red">Delete</Button>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="6">
                <Text>No orders found.</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Orders;
