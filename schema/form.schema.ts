import { object, string, ref } from "yup";

const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

export const createLoginSchema = () => {
  return object({
    email: string()
      .trim()
      .required("Email is required")
      .email("Please enter a valid email")
      .matches(emailRegex, "Please enter a valid email"),
    password: string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
};

export const createRegisterSchema = () => {
  return object({
    firstName: string()
      .trim()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters"),
    lastName: string()
      .trim()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters"),
    email: string()
      .trim()
      .required("Email is required")
      .email("Please enter a valid email")
      .matches(emailRegex, "Please enter a valid email"),
    password: string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: string()
      .trim()
      .required("Confirm password is required")
      .oneOf([ref("password")], "Passwords must match"),
  });
};
