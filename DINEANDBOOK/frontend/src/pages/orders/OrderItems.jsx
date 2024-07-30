import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Link,
  Heading,
  Spinner,
  Icon,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { fetchOrderItems } from "../../hooks/useFetchQuery";
import { FaBoxOpen } from "react-icons/fa";

function OrderItems() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = await fetchOrderItems(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (!order) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl" color="gray.500">
          No order found.
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={6} maxW="900px" mx="auto" bg="gray.50" borderRadius="lg" shadow="md">
      <Text mb={6} fontSize="lg" color="teal.600">
      <Link as={RouterLink} to="/" fontWeight="bold" _hover={{ color: "teal.800" }}>
          Home
        </Link>{" /"}
        <Link as={RouterLink} to="/orders" fontWeight="bold" _hover={{ color: "teal.800" }}>
          Orders
        </Link>{" "}
        / {order.id}
      </Text>
      <Box borderWidth="1px" borderRadius="lg" p={6} mb={6} bg="white" shadow="sm">
        <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.700">
          Order Details
        </Heading>
        <Stack spacing={2}>
          <Text fontSize="lg" fontFamily="'Spline Sans Mono', sans-serif">
            <strong>Order ID:</strong> {order.id}
          </Text>
          <Text fontSize="lg" fontFamily="'Spline Sans Mono', sans-serif">
            <strong>Date:</strong> {order.Date}
          </Text>
          <Text fontSize="lg" fontFamily="'Spline Sans Mono', sans-serif">
            <strong>Total:</strong> ${order.total}
          </Text>
          <Text fontSize="lg" fontFamily="'Spline Sans Mono', sans-serif">
            <strong>Status:</strong>{" "}
            <Text as="span" fontWeight="bold" color={order.status ? "green.500" : "yellow.500"}>
              {order.status ? "Ordered" : "Pending"}
            </Text>
          </Text>
          {order.delivery_crew && (
            <Text fontSize="lg">
              <strong>Delivery Crew:</strong> {order.delivery_crew}
            </Text>
          )}
        </Stack>
      </Box>
      <Heading as="h2" size="md" mb={4} color="teal.700" textAlign="center" fontSize="25px">
        Order Items
      </Heading>
      <Table variant="simple" colorScheme="teal" bg="white" borderRadius="md" shadow="sm">
        <Thead>
          <Tr>
            <Th fontSize="larger">Item</Th>
            <Th fontSize="larger">Quantity</Th>
            <Th fontSize="larger">Unit Price</Th>
            <Th fontSize="larger">Total Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order.order_items.length > 0 ? (
            order.order_items.map((item) => (
              <Tr key={item.id}>
                <Td fontFamily="'Spline Sans Mono', sans-serif">{item.name}</Td>
                <Td fontFamily="'Spline Sans Mono', sans-serif">{item.quantity}</Td>
                <Td fontFamily="'Spline Sans Mono', sans-serif">${item.unit_price}</Td>
                <Td fontFamily="'Spline Sans Mono', sans-serif">${item.price}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Flex direction="column" align="center" justify="center" py={4}>
                  <Icon as={FaBoxOpen} boxSize={8} color="gray.300" />
                  <Text color="gray.500" mt={2}>
                    No items found.
                  </Text>
                </Flex>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

export default OrderItems;
