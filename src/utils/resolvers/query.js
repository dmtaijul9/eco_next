import axios from "axios";

export const getAllEcoSpecialProducts = () =>
  axios.get("/api/products/eco-special").then((res) => res.data);
