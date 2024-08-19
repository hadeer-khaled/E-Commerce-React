import ForgotPasswordForm from "features/Auth/forms/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { forgotPassword } from "api/auth";
export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("email", values.email);
      forgotPassword(formData)
        .then((response) => {
          toast.success(response.data.message, { autoClose: 2000 });
        })
        .catch((error) => {
          toast.error(error.response.data.message, { autoClose: 2000 });
          actions.setErrors(error);
        });
    },
  });
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title">Forgot Password</h2>
          <p>Write your email to send reset link  </p>
          <ForgotPasswordForm formik={formik} />
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </>
  );
}
