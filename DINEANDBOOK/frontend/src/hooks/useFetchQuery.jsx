/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: baseUrl,
});

const auth = axios.create({
  baseURL: baseUrl,
});

//it's work is just to set tokens in the local storage
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

//it's work is just to remove tokens from the local storage
export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// check if the token is valid
export const checkTokenIsValid = async () => {
  if (!getAccessToken()) {
    return false;
  }
  const res = await auth.post("auth/jwt/verify/", { token: getAccessToken() });
  return res.data.code === "token_not_valid" ? false : true;
};

// intercept request and modify headers
api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    if (accessToken) {
      config.headers["Authorization"] = "JWT " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      redirectToLogin();
      return;
      // handle error: inform user, go to login, etc
    } else {
      return Promise.reject(error);
    }
  }
);

//get my data incase there is a refresh
export const whoami = async () => {
  const response = await api.get("auth/users/me/");
  return response.data;
};

// user activation endpoint or activation resend endpoint
export const ActivateUser = async (c) => {
  // console.log(c);
  const res = await auth.post("auth/users/activation/", c);

  return res.data;
};

// login handler
export const GET_AUTH = async (credentials) => {
  const response = await auth.post("auth/jwt/create/", credentials);
  return response.data;
};

// Register handler
export const CREATE_NEW_USER = async (credentials) => {
  // Check if token needs refreshing before making the request
  const response = await auth.post("auth/users/", credentials);
  return response.data;
};
// Password reset handler
export const RESET_PASSWORD = async (data) => {
  const response = await auth.post("auth/users/reset_password_confirm/", data);
  return response.data;
};

//RESET USER PASSWORD sending only the email the rest is in the email
export const RESET_USER_PASSWORD = async (email) => {
  const response = await auth.post(`auth/users/reset_password/`, email);
  return response.data;
};
// redirect to login
export const redirectToLogin = () => {
  // Implement your logic to redirect to the login page
  window.location.href = "auth/login";
};

// get access token
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Fetch all menu items
export const fetchMenuItems = async () => {
  const response = await api.get("/activate/menu/");
  return response.data;
};

// Fetch a single menu item by ID
export const fetchMenuItem = async (id) => {
  const response = await api.get(`/activate/menu/${id}/`);
  return response.data;
};

// Add item to cart with quantity
export const addToCart = async (menuitem, quantity) => {
  try {
    const response = await api.post("/activate/cart/", { menuitem, quantity });
    return response.data;
  } catch (error) {
    console.error("Failed to add item to cart", error);
    throw error;
  }
};
export const fetchCartItems = async () => {
  const response = await api.get('/activate/cart/');
  return response.data;
};



// Update cart item
export const updateCartItem = async (id, quantity) => {
  if (!id) {
    throw new Error('Item ID is required to update cart item.');
  }
  try {
    const response = await api.put(`activate/cart/${id}/`, { quantity });
    return response.data;
  } catch (error) {
    console.error("Failed to update cart item", error);
    throw error;
  }
};

// Remove cart item
export const removeCartItem = async (id) => {
  try {
    const response = await api.delete(`activate/cart/delete/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to remove cart item", error);
    throw error;
  }
};
// Fetch orders
export const fetchOrders = async () => {
  const response = await api.get('/activate/orders/');
  return response.data;
};
// Place order
export const placeOrder = async () => {
  const response = await api.post('/activate/orders/');
  return response.data;
};

// Delete order
export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`activate/orders/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete order", error);
    throw error;
  }
};

// Example function in useFetchQuery.jsx
export const fetchOrderItems = async (orderId) => {
  const response = await api.get(`activate/orders/${orderId}/`);
  return response.data;
};
