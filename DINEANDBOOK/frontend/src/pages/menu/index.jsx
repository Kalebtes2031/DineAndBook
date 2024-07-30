import React, { useState } from "react";
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
  Input,
  Flex,
  Select,
} from "@chakra-ui/react";
import { fetchMenuItems } from "../../hooks/useFetchQuery";
import { Link } from "react-router-dom";

const Menu = () => {
  const { data = [], isLoading, isError } = useQuery("menu", fetchMenuItems);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Text color="red.500">Error fetching menu items</Text>;

  return (
    <Box
      p={6}
      bg="gray.50"
      borderRadius="md"
      shadow="lg"
      bgImage="url('/bgmenu3.jpg')"
      bgSize="cover"
      bgPosition="top"
      fontFamily="'Spline Sans Mono', sans-serif"
    >
      <Heading as="h1" fontSize="80px" mt="100px" mb={6} color="teal.500" textAlign="center">
        Menu
      </Heading>

      <Flex
        mb={4}
        justifyContent="space-between"
        alignItems="center"
        maxW="1000px"
        mx="auto"
        px={4}
      >
        <Input
          placeholder="Search items"
          value={search}
          onChange={handleSearchChange}
          width="250px"
          borderRadius="full"
          bg="white"
          shadow="md"
          _placeholder={{ color: "gray.500" }}
          fontFamily="'Spline Sans Mono', sans-serif"
        />

        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          width="150px"
          borderRadius="full"
          bg="white"
          shadow="md"
          fontFamily="'Spline Sans Mono', sans-serif"
          borderColor="teal.500"
          borderWidth="2px"
          sx={{
            option: {
              borderBottom: "1px solid #e2e8f0",
              padding: "8px",
              backgroundColor: "#f7fafc",
            },
            '&:focus': {
              borderColor: "teal.300",
            },
          }}
        >
          <option
            value={5}
          >
            5 items
          </option>
          <option
            value={10}
            style={{
              borderBottom: "1px solid #e2e8f0",
              padding: "8px",
              backgroundColor: "#f7fafc",
            }}
          >
            10 items
          </option>
          <option
            value={20}
            style={{
              padding: "8px",
              backgroundColor: "#f7fafc",
            }}
          >
            20 items
          </option>
        </Select>
      </Flex>

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
            <Th borderTopLeftRadius="lg" fontSize="25px" >Item</Th>
            <Th fontSize="25px">Price</Th>
            <Th fontSize="25px" borderTopRightRadius="lg">Details</Th>
          </Tr>
        </Thead>
        <Tbody bg="white">
          {paginatedData.length === 0 ? (
            <Tr>
              <Td colSpan="3" textAlign="center">
                <Text>No menu items available</Text>
              </Td>
            </Tr>
          ) : (
            paginatedData.map((item) => (
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

      <Flex mt={4} justifyContent="center">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            variant={currentPage === i + 1 ? "solid" : "outline"}
            colorScheme="teal"
            mx={1}
            size="sm"
            borderRadius="full"
            fontFamily="'Spline Sans Mono', sans-serif"
          >
            {i + 1}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default Menu;
