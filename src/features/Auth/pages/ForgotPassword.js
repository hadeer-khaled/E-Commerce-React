import ForgotPasswordComponent from "features/Auth/components/ForgotPassword";
import { ToastContainer } from "react-toastify";

export default function ForgotPassword() {
  return (
    <>
      <div className=" mx-auto my-10">
        <ForgotPasswordComponent />
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}
