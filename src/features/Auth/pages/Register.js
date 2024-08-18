import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComponent from "features/Auth/components/Register"
export default function Register() {
  return (
    <>
      <div className=" mx-auto my-10">
        <RegisterComponent></RegisterComponent>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}
