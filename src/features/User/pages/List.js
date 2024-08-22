import UserListComponent from "features/User/components/List";

import { ToastContainer } from "react-toastify";

export default function List() {
  return (
    <>
      <div className="container mx-auto">
        <UserListComponent />
        <ToastContainer />
      </div>
    </>
  );
}
