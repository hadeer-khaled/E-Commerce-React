import UserCreateComponent from "features/User/components/Create";

import { ToastContainer } from "react-toastify";

export default function Create() {
  return (
    <>
      <div className=" mx-auto flex justify-center	items-center	 my-10">
        <UserCreateComponent />
        <ToastContainer />
      </div>
    </>
  );
}
