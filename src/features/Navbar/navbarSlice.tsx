import { createSlice } from "@reduxjs/toolkit";

type INavbar = {
  isOpen: boolean;
  isLoggedIn: boolean;
};

const initialState: INavbar = {
  isOpen: false,
  isLoggedIn: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleLogIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    }
  },
});

export const { toggleSidebar, closeSidebar, toggleLogIn } = navbarSlice.actions;
export default navbarSlice.reducer;
