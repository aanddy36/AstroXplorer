import {
  Filters,
  IBodyType,
  IDuration,
  IGroupSize,
  IPrice,
  ISorting,
  ITours,
} from "../moduls";
import { options } from "../utils/filterBtnsOptions";

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

function separatePerType(arr: Filters[]) {
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
  switch (type) {
    case "$300k or less":
      return tours.filter((tour) => (tour.price as number) < 300001);
    case "$301k - $499k":
      return tours.filter(
        (tour) =>
          (tour.price as number) > 300000 && (tour.price as number) < 500000
      );
    case "$500k - $799k":
      return tours.filter(
        (tour) =>
          (tour.price as number) > 499000 && (tour.price as number) < 800000
      );
    case "$800k or more":
      return tours.filter((tour) => (tour.price as number) > 799000);
  }
}

function duration(type: IDuration, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  switch (type) {
    case "60 days or less":
      return tours.filter((tour) => Number(tour.duration) < 61);
    case "61 - 99 days":
      return tours.filter(
        (tour) => Number(tour.duration) > 60 && Number(tour.duration) < 100
      );
    case "100 - 140 days":
      return tours.filter(
        (tour) => Number(tour.duration) > 99 && Number(tour.duration) < 141
      );
    case "141 days or more":
      return tours.filter((tour) => Number(tour.duration) > 140);
  }
}

function groupSize(type: IGroupSize, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  switch (type) {
    case "40 people or less":
      return tours.filter((tour) => tour.groupSize === "20-40");
    case "41 - 80 people":
      return tours.filter(
        (tour) => tour.groupSize === "40-60" || tour.groupSize === "60-80"
      );
    case "81 people or more":
      return tours.filter(
        (tour) => tour.groupSize === "80-100" || tour.groupSize === "100-120"
      );
  }
}
function singleFilter(filter: Filters, tours: ITours[]) {
  if (!tours.length) {
    return [];
  }
  if (isOfTypeBodyType(filter)) {
    return bodyType(filter, tours);
  }
  if (isOfTypeDuration(filter)) {
    return duration(filter, tours);
  }
  if (isOfTypeGroupSize(filter)) {
    return groupSize(filter, tours);
  }
  if (isOfTypePrice(filter)) {
    return price(filter, tours);
  }
}

function applyAllFilters(filtersToAdd: Filters[], originalTours: ITours[]) {
  if (!filtersToAdd || !originalTours) return;
  if (!filtersToAdd.length) {
    return originalTours;
  }
  if (areAllItemsOfTypes(filtersToAdd)) {
    return filtersToAdd
      .map((filter) => singleFilter(filter, originalTours))
      .flatMap((item) => item);
  }
  let groupedPerType = separatePerType(filtersToAdd);
  let selectedToursPerGroup = groupedPerType.map((group) =>
    group
      .map((filter) => singleFilter(filter, originalTours))
      .flatMap((item) => item)
  );
  let commonElem = findCommonElements(selectedToursPerGroup as ITours[][]);
  return commonElem;
}

function sort(sortingMethod: ISorting, tours: ITours[]) {
  console.log(sortingMethod);
  let newArray = tours;
  console.log(newArray);
  switch (sortingMethod) {
    case "Featured":
      return newArray?.sort((a, b) => b.id - a.id);
    case "Price: Low to high":
      return newArray?.sort((a, b) => a.price - b.price);
    case "Duration: Long to short":
      //console.log(newArray?.sort((a, b) => Number(b.duration) - Number(a.duration)));
      return newArray?.sort((a, b) => Number(b.duration) - Number(a.duration));
    case "Duration: Short to long":
      return newArray?.sort((a, b) => Number(a.duration) - Number(b.duration));
  }
}

export function filterAndSort(
  filtersToAdd: Filters[],
  sortingMethod: ISorting,
  allTours: ITours[]
) {
  //console.log([...filtersToAdd]);
  let newArray = applyAllFilters([...filtersToAdd], [...allTours]);
  let sortedArray = sort(sortingMethod, newArray as ITours[]);
  console.log(sortedArray);

  return sortedArray;
}
