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
  Spinner,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log("order data: ", data);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }finally{
        setLoading(false);
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

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box 
      p={6}
      bg="gray.50"
      borderRadius="md"
      shadow="lg"
      // bgImage="url('/bgorder.jpg')"
      bgSize="cover"
      bgPosition="top"
      fontFamily="'Spline Sans Mono', sans-serif"
      height="600px"
    >
      <Heading 
        as="h1"
        fontSize="80px"
        mt="10px"
        mb={6}
        color="black"
        textAlign="center"
      >
        Your Orders
      </Heading>
      <Table 
        mx="auto"
        w="1000px"
        variant="striped"
        colorScheme="teal"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
        fontFamily="'Spline Sans Mono', sans-serif"
      >
        <Thead size="lg" bg="teal.500" color="white" fontWeight="bold" height="70px">
          <Tr>
            <Th borderTopLeftRadius="lg" fontSize="25px">
              Order ID
            </Th>
            <Th fontSize="25px">Date</Th>
            <Th fontSize="25px">Total</Th>
            <Th fontSize="25px">Status</Th>
            <Th fontSize="25px">Details</Th>
            <Th borderTopRightRadius="lg" fontSize="25px">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody bg="white">
          {orders.length > 0 ? (
            orders.map((order) => (
              <Tr key={order.id}>
                <Td fontWeight="bold">{order.id}</Td>
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
