import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const AppLayout = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
            <Header/>
            <main className="bg-fuchsia-100">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default AppLayout;
