import { ClipLoader } from "react-spinners";

export const MiniSpinner = () => {
  return (
    <div className="w-full grid place-content-center">
      <ClipLoader
        size={24}
        loading={true}
        color={"#000000c1"}
      />
    </div>
  );
};
