import { createSlice } from "@reduxjs/toolkit";

interface IRevTours {
  sortingMethod: "featured" | "highest" | "lowest" | "newest";
}

const initialState: IRevTours = {
  sortingMethod: "featured",
};

const sortReviewsSlice = createSlice({
  name: "sortReviews",
  initialState,
  reducers: {
    newSorting: (state, action) => {
      state.sortingMethod = action.payload;
    },
    resetSorting: ()=>{
        return {...initialState}
    }
  },
});

export const { newSorting, resetSorting } = sortReviewsSlice.actions;
export default sortReviewsSlice.reducer;
