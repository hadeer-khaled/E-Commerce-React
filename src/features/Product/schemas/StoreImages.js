import * as yup from "yup";

const StoreImages = yup.object().shape({
  images: yup.array().min(1, "At least one image is required"),
});
export default StoreImages;
