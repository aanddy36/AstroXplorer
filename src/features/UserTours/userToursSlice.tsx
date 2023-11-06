import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";

interface IUserTours {
  favoriteTours: {
    created_at: string;
    id: number;
    tour_id: number;
    user_id: number;
    tours_and_reviews: {
      cardImage: string;
      duration: string;
      name: string;
      price: number;
      title: string;
      avgreview: number;
      totalreviews: number;
    };
  }[];
  idFavoriteTours: { tour_id: number }[];
  isRetrieving: boolean;
  isDeleting: boolean;
  isAdding: boolean;
  error: string;
}

const initialState: IUserTours = {
  favoriteTours: [],
  idFavoriteTours: [],
  isRetrieving: false,
  isDeleting: false,
  isAdding: false,
  error: "",
};

export const retrieveFavoriteTours = createAsyncThunk(
  "userTours/retrieveFavoriteTours",
  async (user_id: string, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(
          "id, created_at, user_id, tour_id, tours_and_reviews( name, title, price, duration, cardImage, avgreview, totalreviews )"
        )
        .eq("user_id", user_id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const retrieveIdFavoriteTours = createAsyncThunk(
  "userTours/retrieveIdFavoriteTours",
  async (user_id: string, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("tour_id")
        .eq("user_id", user_id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFavoriteTour = createAsyncThunk(
  "userTours/deleteFavoriteTour",
  async (
    { favorite_id, user_id }: { favorite_id: string; user_id: string },
    thunkAPI
  ) => {
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", favorite_id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(retrieveFavoriteTours(user_id));
      thunkAPI.dispatch(retrieveIdFavoriteTours(user_id));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavoriteTour = createAsyncThunk(
  "userTours/addFavoriteTour",
  async (
    { tour_id, user_id }: { tour_id: number; user_id: string },
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .insert([{ user_id, tour_id }])
        .select();
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(retrieveFavoriteTours(user_id));
      thunkAPI.dispatch(retrieveIdFavoriteTours(user_id));

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userToursSlice = createSlice({
  name: "userTours",
  initialState,
  reducers: {
    noUsers: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveFavoriteTours.pending, (state) => {
        state.isRetrieving = true;
        state.error = "";
      })
      .addCase(retrieveFavoriteTours.fulfilled, (state, action) => {
        state.favoriteTours =
          action.payload as unknown as IUserTours["favoriteTours"];
        state.isRetrieving = false;
        state.error = "";
      })
      .addCase(retrieveFavoriteTours.rejected, (state, action) => {
        state.isRetrieving = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFavoriteTour.pending, (state) => {
        state.isDeleting = true;
        state.error = "";
      })
      .addCase(deleteFavoriteTour.fulfilled, (state) => {
        state.isDeleting = false;
        state.error = "";
      })
      .addCase(deleteFavoriteTour.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })
      .addCase(retrieveIdFavoriteTours.pending, (state) => {
        state.isRetrieving = true;
        state.error = "";
      })
      .addCase(retrieveIdFavoriteTours.fulfilled, (state, action) => {
        state.idFavoriteTours = action.payload;
        state.isRetrieving = false;
        state.error = "";
      })
      .addCase(retrieveIdFavoriteTours.rejected, (state, action) => {
        state.isRetrieving = false;
        state.error = action.payload as string;
      })
      .addCase(addFavoriteTour.pending, (state) => {
        state.isAdding = true;
        state.error = "";
      })
      .addCase(addFavoriteTour.fulfilled, (state) => {
        state.isAdding = false;
        state.error = "";
      })
      .addCase(addFavoriteTour.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload as string;
      });
  },
});
export const { noUsers } = userToursSlice.actions;
export default userToursSlice.reducer;
