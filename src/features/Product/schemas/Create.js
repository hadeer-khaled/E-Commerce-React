import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required").min(0).max(100000),
  category_id: yup.string().required("Category is required"),
});

export default schema;
