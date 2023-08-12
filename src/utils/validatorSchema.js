import {
  object,
  string,
  number,
  date,
  InferType,
  boolean,
  oneOf,
  ref,
} from "yup";

export const registerSchema = object({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  phone: string().required("Phone number is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain a special character"
    ),
});

export const loginSchema = object({
  phone: string().required("Phone number is required"),
  password: string().required("Password is required"),
});

export const shippingAddressSchema = object({
  address: string().required("Address is required"),
  city: string().required("City is required"),
  postal_code: string().required("Postal code is required"),
  country: string().required("Country is required"),
  reciever_name: string().required("Reciever name is required"),
});
