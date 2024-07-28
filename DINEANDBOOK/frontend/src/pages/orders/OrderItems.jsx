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
} from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { fetchOrderItems } from "../../hooks/useFetchQuery";

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
    return <Spinner />;
  }

  if (!order) {
    return <Text>No order found.</Text>;
  }

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Text mb={4}>
        <Link as={RouterLink} to="/orders" color="teal.500" fontWeight="bold">
          Orders
        </Link>{" "}
        / {order.id}
      </Text>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
        <Heading as="h1" size="lg" mb={4}>
          Order Details
        </Heading>
        <Text>
          <strong>Order ID:</strong> {order.id}
        </Text>
        <Text>
          <strong>Date:</strong> {order.Date}
        </Text>
        <Text>
          <strong>Total:</strong> ${order.total}
        </Text>
        <Text>
          <strong>Status:</strong>{" "}
          <Text as="span" fontWeight="bold" color={order.status ? "green.500" : "yellow.500"}>
            {order.status ? "Ordered" : "Pending"}
          </Text>
        </Text>
        {order.delivery_crew && (
          <Text>
            <strong>Delivery Crew:</strong> {order.delivery_crew}
          </Text>
        )}
      </Box>
      <Heading as="h2" size="md" mb={4}>
        Order Items
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Quantity</Th>
            <Th>Unit Price</Th>
            <Th>Total Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order.order_items.length > 0 ? (
            order.order_items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>${item.unit_price}</Td>
                <Td>${item.price}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Text color="gray.500">No items found.</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

export default OrderItems;
