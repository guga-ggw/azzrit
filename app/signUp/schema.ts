'use client'
import * as yup from "yup";

 const schema = yup.object().shape({
  name: yup.string().required("name is required").max(15, 'name must be lower than 15 characters'),
  email: yup.string().email("Invalid email").required("Email is required").min(8),
  password: yup.string().required("Password is required").min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default schema