import { FaCircleUser } from "react-icons/fa6";
import { useGlobalContext } from "../utils/context";

export const LogIn = () => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  return (
    <div
      className="h-[100vh] relative z-[1] w-full bg-[url('src/images/mars.jpg')] bg-cover bg-bottom
    before:content-[''] before:absolute before:inset-0 before:bg-black/50"
    >
      <div className="inline-block relative top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white">
        {!isLoggedIn ? (
          <button
            className="border text-3xl py-3 px-6 transition duration-200 hover:bg-[--main-font-color] hover:text-[--third-color]"
            onClick={() => setIsLoggedIn(true)}
          >
            Log In
          </button>
        ) : (
          <div className="flex flex-col gap-9">
            <div className="flex items-center text-3xl gap-4">
              <FaCircleUser className="text-[--secundary-color]"/> Welcome, Andres
            </div>
            <button
              className="border text-3xl py-3 px-6 transition duration-200 hover:bg-[--main-font-color] hover:text-[--third-color]"
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
