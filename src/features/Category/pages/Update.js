import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UpdateCategoryComponent from "features/Category/components/Update"
const Update  = () => {

  return (
    <>
      <div className="m-10">
        <UpdateCategoryComponent></UpdateCategoryComponent>
        <ToastContainer />
      </div>
    </>
  )
}
export default Update 