import { Outlet } from "react-router-dom";
import { CoverSection, Footer, Header } from "../components";

const AppLayout = () => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">

      <Header />

      <main className=" grid grid-rows-[auto_auto_auto] p-6">

        <section>
          <CoverSection />
        </section>

        <Outlet />

      </main>

      <Footer />

    </div>
  );
};

export default AppLayout;
