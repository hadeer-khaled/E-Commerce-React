import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { getUserById, updateUserById } from "api/user";
import UserUpdateForm from "features/User/forms/Update";
import UpdateUserSchema from "features/User/schemas/Update";
import { useEffect } from "react";

export default function Create() {
  const navigate = useNavigate();
  const { id } = useParams();

  const roles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      roles: [],
    },

    validationSchema: UpdateUserSchema,
    onSubmit: (values, actions) => {
      const userData = {
        name: values.name,
        email: values.email,
        roles: values.roles.map((role) => role.value),
      };
      console.log(userData);
      updateUserById(id, userData)
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

  useEffect(() => {
    getUserById(id)
      .then((response) => {
        formik.setFieldValue("name", response.data.data.name);
        formik.setFieldValue("email", response.data.data.email);
        formik.setFieldValue(
          "roles",
          response.data.data.roles.map((role) => ({
            value: role,
            label: role,
          }))
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message, 1500);
      });
  }, []);

  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title">Update User</h2>
          <UserUpdateForm formik={formik} roles={roles}></UserUpdateForm>
        </div>
      </div>
    </>
  );
}
