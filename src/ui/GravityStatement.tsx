
export const GravityStatement = ({
  gravity,
  name,
}: {
  gravity: number;
  name: string;
}) => {
  if (gravity === 0) {
    return (
      <span className="font-light bg-transparent text-white/80 rounded-md">
        Hey! Their is NO gravity in {name}
      </span>
    );
  }
  return (
    <span className="font-light bg-transparent text-white/80 rounded-md">
      Hey! The gravity is{" "}
      <span className="text-white font-semibold">{gravity}</span> m/s
      <span className=" text-xs bottom-1 relative">2</span> in{" "}
      {name}
    </span>
  );
};
