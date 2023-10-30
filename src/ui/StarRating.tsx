import { Rate } from "antd";

export const StarRating = ({rating}:{rating:number}) => {
  return (
    <div className="relative">
      <Rate value={5} disabled={true} allowHalf={true} className="text-[#575757] absolute"/>
      <Rate value={rating} disabled={true} allowHalf={true} className=""/>
    </div>
  );
};
