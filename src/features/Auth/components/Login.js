import LoginForm from "features/Auth/forms/Login";
import { useFormik } from "formik";
import LoginSchema from "features/Auth/schemas/LoginSchema";
import { useAuth } from "AuthProvider";

export default function Login() {
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      auth.loginAction(formData);
    },
  });
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title"> Login</h2>
          <LoginForm formik={formik}></LoginForm>
        </div>
      </div>
    </>
  );
}

// export function Logout (){
//   console.log("logout in login")
//   const auth = useAuth();
//   auth.logoutAction();
// }