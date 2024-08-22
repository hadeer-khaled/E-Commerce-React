import UserUpdateComponent from "features/User/components/Update";
import { ToastContainer } from "react-toastify";

export default function Update() {
  return (
    <>
      <div className=" mx-auto flex justify-center	items-center	 my-10">
        <UserUpdateComponent />
        <ToastContainer />
      </div>
    </>
  );
}
