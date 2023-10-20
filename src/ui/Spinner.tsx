import { FadeLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <div className="w-full grid place-content-center h-[400px]">
      <FadeLoader
        loading={true}
        color={"#ffffffc1"}
        aria-setsize={150}
        height={30}
        width={12}
        margin={20}
        radius={20}
        speedMultiplier={2}
      />
    </div>
  );
};
