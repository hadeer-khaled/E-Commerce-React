import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateCategoryComponent from "features/Category/components/Create";
const Create = () => {
  return (
    <>
      <div className="m-10">
        <CreateCategoryComponent></CreateCategoryComponent>
        <ToastContainer />
      </div>
    </>
  );
};
export default Create;
