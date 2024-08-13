import LoginComponent from "features/Auth/components/Login";
import { ToastContainer } from "react-toastify";

export default function Login() {
  return (
    <>
      <LoginComponent></LoginComponent>
      <ToastContainer></ToastContainer>
    </>
  );
}
