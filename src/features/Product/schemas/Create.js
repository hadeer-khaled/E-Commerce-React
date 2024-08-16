import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  category_id: yup.string().required("Category is required"),
});

export default schema;
