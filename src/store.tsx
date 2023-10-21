import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from  './features/Navbar/navbarSlice'
import filterSortingReducer from "./features/FilterAndSorting/filterSortingSlice";

export const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        filterSorting: filterSortingReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;