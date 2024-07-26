// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Box, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getAccessToken, removeTokens, whoami } from "./hooks/useFetchQuery";
import Layout from "./components/Layout"; // Import the layout component
import Home from "./pages/home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

function App() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  useQuery(["whoami"], whoami, {
    onSuccess: (data) => {
      if (data.is_deactivated) {
        removeTokens();
        toast({
          title: "Your account is deactivated",
          description: "Please contact the admin",
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top",
        });
        navigate("/auth/login");
      }
      if (!data.is_active) {
        toast({
          title: "Your account is not active",
          description: "Please verify your email",
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top",
        });
        removeTokens();
        navigate("/auth/login");
      }
      setUser(data);
    },
    onError: (error) => {
      console.log(error);
      removeTokens();
      navigate("/auth/login");
    },
    enabled: getAccessToken() !== null,
    retry: false,
  });

  if (!getAccessToken()) {
    navigate("/auth/login");
    return null;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
