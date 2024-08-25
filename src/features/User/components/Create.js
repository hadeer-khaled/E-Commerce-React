import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { createUser } from "api/user";
import UserCreateForm from "features/User/forms/Create";
import createUserSchema from "features/User/schemas/Create";

export default function Create() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      roles: [],
    },

    validationSchema: createUserSchema,
    onSubmit: (values, actions) => {
      setIsSubmitting(true);

      createUser({ ...values, name: values.username })
        .then((response) => {
          toast.success(response.data.message, { autoClose: 1500 });

          setTimeout(() => {
            navigate("/users");
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
          <h2 className="card-title">Add User</h2>
          <UserCreateForm
            formik={formik}
            roles={roles}
            isSubmitting={isSubmitting}
          ></UserCreateForm>
        </div>
      </div>
    </>
  );
}
