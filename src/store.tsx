import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from  './features/Navbar/navbarSlice'
import filterSortingReducer from "./features/FilterAndSorting/filterSortingSlice";
import filterSidebarReducer from "./features/FilterSidebar/filterSidebarSlice";

export const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        filterSorting: filterSortingReducer,
        filterSidebar: filterSidebarReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;