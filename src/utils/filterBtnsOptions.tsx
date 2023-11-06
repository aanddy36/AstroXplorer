import { IFilterBtn, ISortingOptions } from "../moduls";
import { nanoid } from "nanoid";

export const filterOptions: IFilterBtn[] = [
  {
    tag: "Group Size",
    name: "groupSize",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "40 people or less",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "41 - 80 people",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "81 people or more",
      },
    ],
  },
  {
    tag: "Duration",
    name: "duration",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "60 days or less",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "61 - 99 days",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "100 - 140 days",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "141 days or more",
      },
    ],
  },
  {
    tag: "Price",
    name: "price",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "$300k or less",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "$301k - $499k",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "$500k - $799k",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "$800k or more",
      },
    ],
  },
  {
    tag: "Body Type",
    name: "bodyType",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Planet",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Moon",
      },
    ],
  },
];

export const sortingOptions: ISortingOptions[] = [
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Featured",
  },
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Price: Low to high",
  },/*
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Rating: High to low",
  },*/
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Duration: Long to short",
  },
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Duration: Short to long",
  },
];
export const options = [
  ["Planet", "Moon"],
  ["60 days or less", "61 - 99 days", "100 - 140 days", "141 days or more"],
  ["40 people or less", "41 - 80 people", "81 people or more"],
  ["$300k or less", "$301k - $499k", "$500k - $799k", "$800k or more"],
];
