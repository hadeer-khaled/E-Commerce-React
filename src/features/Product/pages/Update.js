import UpdateProductComponent from "features/Product/components/Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Update() {
  return (
    <>
      <UpdateProductComponent />
      <ToastContainer />
    </>
  );
}
