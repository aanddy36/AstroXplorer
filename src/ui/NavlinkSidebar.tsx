import { NavLink } from "react-router-dom";

export const NavlinkSidebar = ({
  children,
  route,
  setIsOpen
}: {
  children: string;
  route: string;
  setIsOpen: (data:boolean)=>void
}) => {
  return (
    <li onClick={() => setIsOpen(false)}>
      <NavLink
        to={route}
        className={`block border-b border-[--sidebar-border-color] w-full py-2 transiton duration-200 px-[7%] hover:pr-[11%]`}
      >
        {children}
      </NavLink>
    </li>
  );
};
