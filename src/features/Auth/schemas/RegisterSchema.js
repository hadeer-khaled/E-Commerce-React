import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required("The name is required").max(50, "The name must be at most 50 characters"),
    email: yup.string().email("Invalid email format").required("The email is required"),
    password: yup.string().required("The password is required").min(3, "The password must be at least 3 characters"),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Password confirmation is required")
      .min(3, "Password confirmation must be at least 3 characters")
  });
  

export default schema