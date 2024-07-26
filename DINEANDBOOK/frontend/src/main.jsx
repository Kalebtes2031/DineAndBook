import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Auth from "./pages/auth/index.jsx";
import { UserProvider } from "./context/context.jsx";
import Menu from "./pages/menu";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Booking from "./pages/booking";
import About from "./pages/about/index.jsx";
import Home from "./pages/home/index.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },  // Home page route
      { path: 'menu', element: <Menu /> },
      { path: 'cart', element: <Cart /> },
      { path: 'orders', element: <Orders /> },
      { path: 'booking', element: <Booking /> },
      { path: 'about', element: <About /> },
    ],
  },
  {
    path: "auth/*",
    element: <Auth />,
  },
]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);