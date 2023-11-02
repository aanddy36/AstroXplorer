import { NavLink } from "react-router-dom";

export const NavLinkTour = ({children,route, end = false}:{children:string,route:string, end?: boolean}) => {

  return (
    <NavLink
      to={route} end={end}
      className={({ isActive }) =>
        isActive
          ? "text-white font-bold border-b-2 border-b-white py-4 text-center"
          : "text-white/40 transition duration-200 hover:text-white py-4 text-center"
      }
    >
      {children}
    </NavLink>
  );
};