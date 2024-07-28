import React, { useState, useEffect } from "react";
import { fetchOrders, deleteOrder } from "../../hooks/useFetchQuery";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log("order data: ", data);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    loadOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Heading as="h1" mb={4}>
        Your Orders
      </Heading>
      <Table variant="striped" colorScheme="teal">
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
                <Td>{order.Date}</Td>
                <Td>${order.total}</Td>
                <Td>
                  <Text
                    fontWeight="bold"
                    color={order.status ? "green.500" : "yellow.500"}
                  >
                    {order.status ? "Ordered" : "Pending"}
                  </Text>
                </Td>
                <Td>
                  <Link
                    as={RouterLink}
                    to={`/orders/${order.id}`}
                    color="teal.500"
                    fontWeight="bold"
                  >
                    View Details
                  </Link>
                </Td>
                <Td>
                  {order.status ? (
                    <Text color="gray.500">Already ordered.</Text>
                  ) : (
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6} textAlign="center">
                <Text color="gray.500">No orders found.</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Orders;
