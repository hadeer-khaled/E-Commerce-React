import ResetPasswordComponent from "features/Auth/components/ResetPassword";
import { ToastContainer } from "react-toastify";

export default function ResetPassword() {
  return (
    <>
      <div className=" mx-auto my-10">
        <ResetPasswordComponent />
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}
