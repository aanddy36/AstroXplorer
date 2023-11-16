export interface IHomeBg {
  planet: string;
  price: string;
  image: string;
  position: string;
  id: number;
}

export interface ITours {
  id: number;
  name: string;
  isPlanet: boolean;
  gravity: number;
  aroundPlanet: string;
  title: string;
  description: string;
  price: number;
  groupSize: string;
  duration: string;
  cardImage: string;
  tourImage: string;
  totalreviews: number;
  avgreview: number;
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
  [key: string]: boolean;
}

export interface IFilterBtn {
  tag: string;
  name: string;
  options: OptionsFilter[];
}
export interface OptionsFilter {
  idShared: Filters;
  idSidebar: string;
  idFull: string;
}
export interface ISortingOptions {
  idShared: string;
  idSidebar: string;
  idFull: string;
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
export type IGroupSize =
  | "40 people or less"
  | "41 - 80 people"
  | "81 people or more";

export type ISorting =
  | "Featured"
  | "Price: Low to high"
  | "Rating: High to low"
  | "Duration: Long to short"
  | "Duration: Short to long";

export type Filters = IBodyType | IDuration | IPrice | IGroupSize;

export interface IReviewsHome {
  name: string;
  review: string;
  date: string;
  tourTitle: string;
  id: number;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface INewUser {
  signupName: string;
  signupSurname: string;
  signupEmail: string;
  signupPassword: string;
  signupConfirm?: string;
}
export interface ILogin {
  loginEmail: string;
  loginPassword: string;
}

export interface ISingleReview {
  id: number;
  rating: number;
  review: string;
  title: string;
  date: string;
  userName: string;
  tour_id: number;
  isSuggested: boolean;
}
export interface IItinerary {
  id: number;
  tour_id: number;
  title: string;
  startDay: number;
  endDay: number;
  activities: string[];
}
export interface IDate {
  id: number;
  tour_id: number;
  startDate: string;
  price: number;
  duration: string;
}

export interface IFavTour {
  id: number;
  created_at: string;
  user_id: number;
  tour_id: number;
  tours: IInfoFavTour;
}

export interface IInfoFavTour {
  name: string;
  title: string;
  price: number;
  duration: string;
  cardImage: string;
}

export interface newPurchasedTour {
  id: number;
  user_id: string;
  date_id: number;
  numTravelers: number;
  isSuitPremium: boolean;
  totalPrice: number;
  tour_id: number;
}
export interface IPurchasedTour extends newPurchasedTour {
  cardImage: string;
  created_at: string;
  title: string;
  startDate: string;
  useremail: string;
  price: number;
  userdata: {
    name: string;
    surname: string;
  };
}
