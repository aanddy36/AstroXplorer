import { Link } from "react-router-dom";

export const WrongPage = () => {
  return (
    <main className="bg-[url('/src/images/bgImages/starred-bg.jpg')] bg-black h-[100vh] relative z-[1]">
      <div
        className="absolute top-[50%] translate-y-[-50%] left-[10%] text-[--main-font-color] w-[80%] laptop:w-[45%]
       flex flex-col gap-6"
      >
        <h1 className="text-8xl">
          Something went <span className="text-yellow-500">wrong</span>
        </h1>
        <Link
          to="/"
          className="p-2 border-2 text-white text-lg hover:bg-white hover:text-black transition
           duration-200 inline-block w-[200px] mt-6 text-center font-semibold"
        >
          Go home
        </Link>
      </div>
    </main>
  );
};
