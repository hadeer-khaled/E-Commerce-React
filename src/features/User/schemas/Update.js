import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("The name is required")
    .max(50, "The name must be at most 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("The email is required"),
  roles: yup
    .array()
    .min(1, "You must select at least one role")
    .required("The role is required"),
});

export default schema;
