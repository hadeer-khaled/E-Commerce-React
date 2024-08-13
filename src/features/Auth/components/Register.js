import RegisterForm from "features/Auth/forms/Register";
import { useFormik } from "formik";
import RegisterSchema from "features/Auth/schemas/RegisterSchema"
import {register} from "api/auth"
import { toast } from "react-toastify";

export default function Register() {
  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      password_confirmation:'',
    },

    validationSchema:RegisterSchema,

    onSubmit:(values , actions)=>{
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('password_confirmation', values.password_confirmation);
      register(values)
      .then(response=>{
        toast.success(response.data.message ,{ autoClose: 2000 });
        actions.resetForm()
      })
      .catch(error=>{
        actions.setErrors(error);
      })
    }
  }) ;
  return(
     <>
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Register</h2>
            <RegisterForm formik={formik}></RegisterForm>
          </div>
        </div>
    </>
  );
}
