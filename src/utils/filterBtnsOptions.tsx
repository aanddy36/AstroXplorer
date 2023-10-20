import { IFilterBtn, ISortingOptions } from "../moduls";

export const filterOptions: IFilterBtn[] = [
  {
    tag: "Group Size",
    name: "groupSize",
    options: [
      {
        id: "40 people or less",
      },
      {
        id: "41 - 80 people",
      },
      {
        id: "81 people or more",
      },
    ],
  },
  {
    tag: "Duration",
    name: "duration",
    options: [
      {
        id: "60 days or less",
      },
      {
        id: "61 - 99 days",
      },
      {
        id: "100 - 140 days",
      },
      {
        id: "141 days or more",
      },
    ],
  },
  {
    tag: "Price",
    name: "price",
    options: [
      {
        id: "$300k or less",
      },
      {
        id: "$301k - $499k",
      },
      {
        id: "$500k - $799k",
      },
      {
        id: "$800k or more",
      },
    ],
  },
  {
    tag: "Body Type",
    name: "bodyType",
    options: [
      {
        id: "Planet",
      },
      {
        id: "Moon",
      },
    ],
  },
];

export const sortingOptions: ISortingOptions[] = [
  {
    id: "Featured",
  },
  {
    id: "Price: Low to high",
  },
  {
    id: "Rating: High to low",
  },
  {
    id: "Duration: Long to short",
  },
  {
    id: "Duration: Short to long",
  },
];
export const options = [
  ["Planet", "Moon"],
  ["60 days or less", "61 - 99 days", "100 - 140 days", "141 days or more"],
  ["40 people or less", "41 - 80 people", "81 people or more"],
  ["$300k or less", "$301k - $499k", "$500k - $799k", "$800k or more"],
];
