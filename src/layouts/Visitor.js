import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className=" mx-auto flex flex-col justify-center	items-center	">
        <h2 class="text-center mt-20 text-2xl font-bold leading-7 text-gray-900 ">
          Welcome to our E-Commerce Website
        </h2>
        <Outlet></Outlet>
      </div>
    </>
  );
};
export default Dashboard;
