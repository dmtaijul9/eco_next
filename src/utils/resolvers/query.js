import axios from "axios";

export const getAllEcoSpecialProducts = () =>
  axios.get("/api/products/eco-special").then((res) => res.data);

export const getSingleProduct = ({ id }) =>
  axios.get(`/api/products/${id}`).then((res) => res.data);

export const getSingleOrderQuery = ({ id }) =>
  axios.get(`/api/order/${id}`).then((res) => res.data);

export const getAllProductsQuery = () =>
  axios.get("/api/products").then((res) => res.data);

export const getDashboardAnalyticsQuery = () => {
  return axios.get("/api/admin/analytics").then((res) => res.data);
};

export const getLetestOrdersQuery = () =>
  axios.get("/api/admin/order").then((res) => res.data);

export const getLetestUsersQuery = () =>
  axios.get("/api/admin/users").then((res) => res.data);

export const getMyOrdersQuery = () =>
  axios.get("/api/order").then((res) => res.data);
