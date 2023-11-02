import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/Navbar/navbarSlice";
import filterSortingReducer from "./features/FilterAndSorting/filterSortingSlice";
import filterSidebarReducer from "./features/FilterSidebar/filterSidebarSlice";
import authReducer from "./features/Auth/authSlice";
import currentTourReducer from "./features/CurrentTour.tsx/currentTourSlice";
import sortReviewsReducer from "./features/SortReviews/sortReviewsSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    filterSorting: filterSortingReducer,
    filterSidebar: filterSidebarReducer,
    auth: authReducer,
    currentTour: currentTourReducer,
    sortReviews: sortReviewsReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
