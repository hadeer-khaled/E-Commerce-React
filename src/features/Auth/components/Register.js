import RegisterForm from "features/Auth/forms/Register";
import { useFormik } from "formik";
import RegisterSchema from "features/Auth/schemas/RegisterSchema";
import { register } from "api/auth";
import { toast } from "react-toastify";
import { useAuth } from "AuthProvider";
import {useState} from "react";
export default function Register() {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validationSchema: RegisterSchema,

    onSubmit: (values, actions) => {
      setIsSubmitting(true);
      auth.registerAction(values);
    },
  });
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <RegisterForm
            formik={formik}
            isSubmitting={isSubmitting}
          ></RegisterForm>
        </div>
      </div>
    </>
  );
}
