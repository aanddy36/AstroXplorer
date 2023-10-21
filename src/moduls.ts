export interface IHomeBg {
    planet: string;
    price:string;
    image: string;
    position: string;
}

export interface ITours {
    id: number;
    name?:string;
    isPlanet?: boolean;
    gravity?: number;
    aroundPlanet?: string;
    title?:string;
    description?:string;
    price:number;
    groupSize?:string;
    duration:string;
    cardImage?:string;
}

export interface Coordinates {
    offsetX: number;
    offsetY: number;
}

export interface FilterButtons {
    price: boolean;
    groupSize: boolean;
    duration: boolean;
    bodyType: boolean;
    sort: boolean;
    [key:string]:boolean;
}

export interface IFilterBtn {   
    tag: string,
    name: string,
    options: {
        id: Filters,
      }[],
}
export interface ISortingOptions {
    id: string,
  }
  
export type IBodyType = "Planet" | "Moon";
export type IPrice =
  | "$300k or less"
  | "$301k - $499k"
  | "$500k - $799k"
  | "$800k or more";
export type IDuration =
  | "60 days or less"
  | "61 - 99 days"
  | "100 - 140 days"
  | "141 days or more";
export type IGroupSize = "40 people or less" | "41 - 80 people" | "81 people or more";

 export type ISorting =
  | "Featured"
  | "Price: Low to high"
  | "Rating: High to low"
  | "Duration: Long to short"
  | "Duration: Short to long";

export type Filters =  IBodyType | IDuration | IPrice | IGroupSize
