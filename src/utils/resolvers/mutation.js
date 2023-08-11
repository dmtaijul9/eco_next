import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerMutation = ({ variables }) =>
  axios.post("/api/auth/register", variables, config).then((res) => res.data);
