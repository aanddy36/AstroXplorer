import { createSlice } from "@reduxjs/toolkit";
import { FilterButtons } from "../../moduls";

type INavbar = {
  isOpen: boolean;
  areTheyOpenSidebar: FilterButtons;
};

const initialState: INavbar = {
  isOpen: false,
  areTheyOpenSidebar: {
    price: false,
    groupSize: false,
    duration: false,
    bodyType: false,
    sort: false,
  },
};

const filterSidebar = createSlice({
  name: "filterSidebar",
  initialState,
  reducers: {
    toggleFilterSidebar: (state, { payload }) => {
      state.isOpen = payload;
    },
    openOrClose: (state, { payload }) => {
      return {
        ...state,
        areTheyOpenSidebar: {
          ...initialState.areTheyOpenSidebar,
          [payload]: !state.areTheyOpenSidebar[payload],
        },
      };
    },
    closeThemAllSidebar: (state) => {
      state.areTheyOpenSidebar = initialState.areTheyOpenSidebar;
    },
  },
});

export const { toggleFilterSidebar, openOrClose, closeThemAllSidebar } = filterSidebar.actions;
export default filterSidebar.reducer;
