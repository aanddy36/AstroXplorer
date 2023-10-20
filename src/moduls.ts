export interface IHomeBg {
    planet: string;
    price:string;
    image: string;
    position: string;
}

export interface ITours {
    id?: number;
    name?:string;
    isPlanet?: boolean;
    gravity?: number;
    aroundPlanet?: string;
    title?:string;
    description?:string;
    price?:number;
    groupSize?:string;
    duration?:string;
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
        id: string,
      }[],
}
export interface ISortingOptions {
    id: string,
  }