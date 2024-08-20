import ResetPasswordForm from "features/Auth/forms/ResetPassword";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { resetPassword } from "api/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },

    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      resetPassword(formData)
        .then((response) => {
          toast.success(response.data.message, { autoClose: 1500 });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          toast.error(error.response.data.message, { autoClose: 1500 });
          actions.setErrors(error);
        });
    },
  });
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title">Reset Password</h2>
          <ResetPasswordForm formik={formik} />
        </div>
      </div>
    </>
  );
}
