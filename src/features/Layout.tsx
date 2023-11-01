import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <main className="bg-[url('/src/images/bgImages/starred-bg.jpg')] bg-black">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
