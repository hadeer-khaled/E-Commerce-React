import * as yup from 'yup'

const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("The email is required"),
    password: yup.string().required("The password is required").min(3, "The password must be at least 3 characters"),
  });
  

export default schema