import { useQuery } from "@tanstack/react-query";
import { getTours } from "./apiTours";
import { useEffect, useState } from "react";
import { ITours } from "../moduls";
import { options } from "../utils/filterBtnsOptions";

type IBodyType = "Planet" | "Moon";
type IPrice =
  | "$300k or less"
  | "$301k - $499k"
  | "$500k - $799k"
  | "$800k or more";
type IDuration =
  | "60 days or less"
  | "61 - 99 days"
  | "100 - 140 days"
  | "141 days or more";
type IGroupSize = "40 people or less" | "41 - 80 people" | "81 people or more";

function isOfTypeBodyType(value: string): value is IBodyType {
  return options[0].includes(value);
}
function isOfTypePrice(value: string): value is IPrice {
  return options[3].includes(value);
}
function isOfTypeDuration(value: string): value is IDuration {
  return options[1].includes(value);
}
function isOfTypeGroupSize(value: string): value is IGroupSize {
  return options[2].includes(value);
}

function whichType(
  value: string
): "groupSize" | "duration" | "price" | "bodyType" {
  if (options[2].includes(value)) {
    return "groupSize";
  } else if (options[1].includes(value)) {
    return "duration";
  } else if (options[3].includes(value)) {
    return "price";
  }
  return "bodyType";
}
function areAllItemsOfTypes(arr: string[]) {
  let trueOrFalse = false;
  for (let i = 0; i < 4; i++) {
    trueOrFalse = arr.every((item) => options[i].includes(item));
    if (trueOrFalse) {
      break;
    }
  }
  return trueOrFalse;
}
function areAllDifferentType(arr: string[]) {
  let newArray = [...new Set(arr.map((filter) => whichType(filter)))];
  return arr.length - newArray.length;
}
function separatePerType(arr: string[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    let found = false;

    for (let j = 0; j < result.length; j++) {
      const subarray = result[j];
      if (
        subarray.length > 0 &&
        whichType(subarray[0]) === whichType(element)
      ) {
        subarray.push(element);
        found = true;
        break;
      }
    }

    if (!found) {
      result.push([element]);
    }
  }
  return result;
}
function findCommonElements(arrays: ITours[][]) {
  if (arrays.length < 2) {
    return [...arrays[0]];
  }

  const firstArray = new Set(arrays[0]);

  const commonElements = [...firstArray].filter((item) =>
    arrays.slice(1).every((subarray) => subarray.includes(item))
  );

  return commonElements;
}
function bodyType(type: IBodyType, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  if (type === "Planet") {
    return tours.filter((tour) => tour.isPlanet === true);
  }
  return tours.filter((tour) => tour.isPlanet === false);
}

function price(type: IPrice, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  let newArray = [];
  switch (type) {
    case "$300k or less":
      return (newArray = tours.filter(
        (tour) => (tour.price as number) < 300001
      ));
    case "$301k - $499k":
      return (newArray = tours.filter(
        (tour) =>
          (tour.price as number) > 300000 && (tour.price as number) < 500000
      ));
    case "$500k - $799k":
      return (newArray = tours.filter(
        (tour) =>
          (tour.price as number) > 499000 && (tour.price as number) < 800000
      ));
    case "$800k or more":
      return (newArray = tours.filter(
        (tour) => (tour.price as number) > 799000
      ));
  }
}

function duration(type: IDuration, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  let newArray = [];
  switch (type) {
    case "60 days or less":
      return (newArray = tours.filter((tour) => Number(tour.duration) < 61));
    case "61 - 99 days":
      return (newArray = tours.filter(
        (tour) => Number(tour.duration) > 60 && Number(tour.duration) < 100
      ));
    case "100 - 140 days":
      return (newArray = tours.filter(
        (tour) => Number(tour.duration) > 99 && Number(tour.duration) < 141
      ));
    case "141 days or more":
      return (newArray = tours.filter((tour) => Number(tour.duration) > 140));
  }
}

function groupSize(type: IGroupSize, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  let newArray = [];
  switch (type) {
    case "40 people or less":
      return (newArray = tours.filter((tour) => tour.groupSize === "20-40"));
    case "41 - 80 people":
      return (newArray = tours.filter(
        (tour) => tour.groupSize === "40-60" || tour.groupSize === "60-80"
      ));
    case "81 people or more":
      return (newArray = tours.filter(
        (tour) => tour.groupSize === "80-100" || tour.groupSize === "100-120"
      ));
  }
}
function singleFilter(filter: string, tours: ITours[]) {
  if (!tours.length) {
    return [];
  }
  if (isOfTypeBodyType(filter)) {
    return bodyType(filter as IBodyType, tours);
  }
  if (isOfTypeDuration(filter)) {
    return duration(filter as IDuration, tours);
  }
  if (isOfTypeGroupSize(filter)) {
    return groupSize(filter as IGroupSize, tours);
  }
  if (isOfTypePrice(filter)) {
    return price(filter as IPrice, tours);
  }
}

function applyAllFilters(
  filtersToAdd: string[],
  tours: ITours[] | undefined,
  originalTours: ITours[] | undefined
) {
  if (!filtersToAdd || !originalTours) return;
  if (!filtersToAdd.length) {
    return originalTours;
  }
  //console.log(filtersToAdd);
  //console.log(tours);
  if (areAllItemsOfTypes(filtersToAdd)) {
    return filtersToAdd
      .map((filter) => singleFilter(filter, originalTours))
      .flatMap((item) => item);
  }
  /*if (!areAllDifferentType(filtersToAdd)) {
    let finalArray: any = [...tours];
    for (let i = 0; i < filtersToAdd.length; i++) {
      finalArray = singleFilter(filtersToAdd[i], finalArray);
    }
    return finalArray;
  }*/
  let groupedPerType = separatePerType(filtersToAdd);
  let selectedToursPerGroup = groupedPerType.map((group) =>
    group.map((filter) => singleFilter(filter, tours as ITours[])).flatMap((item) => item)
  );
  console.log(groupedPerType);
  console.log(selectedToursPerGroup);
  let commonElem = findCommonElements(selectedToursPerGroup as ITours[][]);
  return commonElem;
  //}
  return tours;
}

export const useFilters = (filtersToAdd: string[]) => {
  const { data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  const [finalTours, setFinalTours] = useState(tours as ITours[]);
  useEffect(() => {
    //console.log(filtersToAdd);
    console.log("Holi");
    let newArray = applyAllFilters(filtersToAdd, finalTours, tours as ITours[]);
    setFinalTours(newArray as any);
  }, [filtersToAdd]);
  //console.log(applyAllFilters(filtersToAdd, finalTours));

  useEffect(() => {
    
    setFinalTours(tours as ITours[]);
  }, [tours]);

  useEffect(() => console.log(finalTours), [finalTours]);

  return { finalTours };
};
