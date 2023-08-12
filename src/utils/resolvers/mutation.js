import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerMutation = ({ variables }) =>
  axios.post("/api/auth/register", variables, config).then((res) => res.data);

export const createOrderMutation = ({ variables }) =>
  axios.post("/api/order", variables, config).then((res) => res.data);

export const updateOrderMutationByAdmin = ({ variables, orderId }) =>
  axios
    .put(`/api/admin/order/${orderId}`, variables, config)
    .then((res) => res.data);

export const createProductMutation = ({ variables }) =>
  axios.post("/api/products", variables, config).then((res) => res.data);

export const updateUserMutation = ({ variables, userId }) =>
  axios.put("/api/user/" + userId, variables, config).then((res) => res.data);
