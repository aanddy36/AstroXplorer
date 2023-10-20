import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-[--third-color] text-[--main-font-color]">
      <div className="grid grid-cols-1 laptop:grid-cols-5 px-[4%] laptop:px-[10%] pt-20 pb-10">
        <div className="laptop:col-span-2 pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
          <h1 className="font-bold text-lg">About AstroXplorer</h1>
          <span className="text-sm text-[--secundary-color] font-light laptop:text-justify">
            At AstroXplorer, we are on a mission to redefine the boundaries of
            human exploration and adventure. Founded in 2021 by a group of
            visionary scientists, engineers, and space enthusiasts, our company
            is dedicated to making the extraordinary accessible to everyone. Our
            commitment to pushing the limits of space travel and tourism is what
            sets us apart.
          </span>
        </div>
        <div className=" pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
          <h1 className="font-bold text-lg">Connect</h1>
          <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
            <a
              href="https://www.instagram.com/elchuzodedelchiaro/"
              target="_blank"
            >
              <li>Instagram</li>
            </a>
            <a href="https://www.facebook.com/andres.dechiaro" target="_blank">
              <li>Facebook</li>
            </a>
            <a href="https://twitter.com/?lang=es" target="_blank">
              <li>Twitter</li>
            </a>
            <a href="https://www.linkedin.com/in/delchiaroa/" target="_blank">
              <li>LinkedIn</li>
            </a>
          </ul>
        </div>
        <div className=" pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
          <h1 className="font-bold text-lg">Links</h1>
          <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="tours">
              <li>Tours</li>
            </Link>
            <Link to="about">
              <li>About</li>
            </Link>
          </ul>
        </div>
        <div className=" pr-8 flex flex-col gap-8 mb-10">
          <h1 className="font-bold text-lg">Contact</h1>
          <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
            <li>43 Raymouth Rd. Baltemoer, London 3910</li>
            <li>+1(123)-456-7890</li>
            <li>+1(321)-456-7890</li>
            <li>anchibro@hotmail.com</li>
          </ul>
        </div>
      </div>
      <span className="block text-sm text-[--secundary-color] font-light text-center pb-14 pt-8">
        Copyright ©2023 All rights reserved{" "}
      </span>
    </div>
  );
};
