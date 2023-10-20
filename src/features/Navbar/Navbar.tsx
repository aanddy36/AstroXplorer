import { useState } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      <Topbar setIsToggleOpen={setIsToggleOpen}/>
      <Sidebar isOpen={isToggleOpen} setIsOpen={setIsToggleOpen}/>
    </>
  );
};
