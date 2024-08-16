import CreateProductComponent from "features/Product/components/Create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Create() {
  return (
    <>
      <CreateProductComponent />
      <ToastContainer />
    </>
  );
}
