import axios from "axios";

export const getAllEcoSpecialProducts = () =>
  axios.get("/api/products/eco-special").then((res) => res.data);

export const getSingleProduct = ({ id }) =>
  axios.get(`/api/products/${id}`).then((res) => res.data);
