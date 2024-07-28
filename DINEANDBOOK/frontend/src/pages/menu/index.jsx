import React from "react";
import { useQuery } from "react-query";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { fetchMenuItems } from "../../hooks/useFetchQuery";
import { Link } from "react-router-dom";

const Menu = () => {
  const { data = [], isLoading, isError } = useQuery("menu", fetchMenuItems);

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Text color="red.500">Error fetching menu items</Text>;

  return (
    <Box p={6} bg="gray.50" borderRadius="md" shadow="md">
      <Heading as="h1" size="xl" mb={6} color="teal.500">
        Menu
      </Heading>
      <Table 
        mx="auto" 
        w="1000px" 
        variant="striped" 
        colorScheme="teal" 
        border="1px"
        borderColor="gray"
        borderRadius="19px"
        >
        <Thead bg="gray" color="black">
          <Tr>
            <Th>Item</Th>
            <Th>Price</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 ? (
            <Tr>
              <Td colSpan="3" textAlign="center">
                <Text>No menu items available</Text>
              </Td>
            </Tr>
          ) : (
            data.map((item) => (
              <Tr key={item.id}>
                <Td fontWeight="bold">{item.title}</Td>
                <Td>${item.price}</Td>
                <Td>
                  <Link to={`/menu/${item.id}`}>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Menu;
