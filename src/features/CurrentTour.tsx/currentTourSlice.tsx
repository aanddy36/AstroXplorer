import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IItinerary, ISingleReview, ITours } from "../../moduls";
import supabase from "../../services/supabase";

type ICurrentTour = {
  currentTour: ITours;
  error: string;
  isRetrieving: boolean;
  reviewsTour: ISingleReview[];
  itinerary: IItinerary[];
  avgReview: number
};

const initialState: ICurrentTour = {
  currentTour: {} as ITours,
  error: "",
  isRetrieving: false,
  reviewsTour: [],
  itinerary: [],
  avgReview: 0
};

export const retrieveOneTour = createAsyncThunk(
  "currentTour/retrieveOneTour",
  async (id: string, thunkAPI) => {
    try {
      const { data: tour, error } = await supabase
        .from("tours")
        .select("*")
        .eq("id", id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(retrieveReviews(id));
      thunkAPI.dispatch(retrieveItinerary(id))
      return tour;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const retrieveReviews = createAsyncThunk(
  "currentTour/retrieveReviews",
  async (id: string, thunkAPI) => {
    try {
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("tour_id", id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return reviews;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const retrieveItinerary = createAsyncThunk(
  "currentTour/retrieveItinerary",
  async (id: string, thunkAPI) => {
    try {
      const { data: itinerary, error } = await supabase
        .from("itinerary")
        .select("*")
        .eq("tour_id", id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return itinerary;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const currentTourSlice = createSlice({
  name: "currentTour",
  initialState,
  reducers: {
    resetCurrentTour: (state) => {
      state.currentTour = {} as ITours;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveOneTour.pending, (state) => {
        state.isRetrieving = true;
        state.error = "";
      })
      .addCase(retrieveOneTour.fulfilled, (state, action) => {
        state.isRetrieving = false;
        state.currentTour = action.payload?.[0];
      })
      .addCase(retrieveOneTour.rejected, (state, action) => {
        state.isRetrieving = false;
        state.error = action.payload as string;
      })
      .addCase(retrieveReviews.pending, (state) => {
        state.isRetrieving = true;
        state.error = "";
      })
      .addCase(retrieveReviews.fulfilled, (state, action) => {
        state.isRetrieving = false;
        state.reviewsTour = action.payload;
        if(!action.payload.length){
          state.avgReview = 0
        }
        let avg = 0;
        action.payload.forEach((review) => (avg += review.rating));
        state.avgReview = Number((avg / action.payload.length).toFixed(1));
      })
      .addCase(retrieveReviews.rejected, (state, action) => {
        state.isRetrieving = false;
        state.error = action.payload as string;
      })
      .addCase(retrieveItinerary.pending, (state) => {
        state.isRetrieving = true;
        state.error = "";
      })
      .addCase(retrieveItinerary.fulfilled, (state, action) => {
        state.isRetrieving = false;
        state.itinerary = action.payload;
      })
      .addCase(retrieveItinerary.rejected, (state, action) => {
        state.isRetrieving = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCurrentTour } = currentTourSlice.actions;
export default currentTourSlice.reducer;
