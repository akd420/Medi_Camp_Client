import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar";
import Footer from "../Components/Shared/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='min-h-[calc(100vh-256px)] lg:min-h-[calc(100vh-296px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster></Toaster>
        </div>
    );
};

export default Root;