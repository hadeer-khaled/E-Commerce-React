import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import UserTable from "features/User/components/Table";
import { getUsers, deleteUserById } from "api/user";
import Loader from "components/Loader/Loader";
import { NavLink } from "react-router-dom";

export default function List() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers()
      .then((Response) => {
        setUsersList(Response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleDelete = (user_id) => {
    deleteUserById(user_id)
      .then((response) => {
        toast.success(response.data.message, { autoClose: 2000 });
        fetchUsers();
      })
      .catch((error) => {
        toast.error(error.response.data.message, { autoClose: 2000 });
      });
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex justify-end">
        <NavLink to={`/users/create`} className="btn btn-primary">
          Add New User
        </NavLink>
      </div>
      <UserTable usersList={usersList} handleDelete={handleDelete} />
    </>
  );
}
