import { Outlet } from "react-router-dom";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

const UserLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}
export default UserLayout