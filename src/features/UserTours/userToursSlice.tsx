import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";
import { IPurchasedTour, newPurchasedTour } from "../../moduls";

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
  purchasedTours: IPurchasedTour[];
  isRetrieving: boolean;
  isDeleting: boolean;
  isAdding: boolean;
  error: string;
  isConfirmingPurchase: boolean;
  isPurchasing: boolean;
}

const initialState: IUserTours = {
  favoriteTours: [],
  idFavoriteTours: [],
  purchasedTours: [],
  isRetrieving: false,
  isDeleting: false,
  isAdding: false,
  error: "",
  isConfirmingPurchase: true,
  isPurchasing: false,
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

export const retrievePurchasedTours = createAsyncThunk(
  "userTours/retrievePurchasedTours",
  async (user_id: string, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("purchased_tours_full")
        .select("*")
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
export const addPurchasedTour = createAsyncThunk(
  "userTours/addPurchasedTour",
  async (
    {
      id,
      user_id,
      date_id,
      numTravelers,
      isSuitPremium,
      totalPrice,
      tour_id,
    }: newPurchasedTour,
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase
        .from("purchased_tours")
        .insert({
          id,
          user_id,
          date_id,
          numTravelers,
          isSuitPremium,
          totalPrice,
          tour_id,
        })
        .select();
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(changeConfirmingPopup(false));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletePurchasedTour = createAsyncThunk(
  "userTours/deletePurchasedTour",
  async (
    { purchased_id, user_id }: { purchased_id: string; user_id: string },
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase
        .from("purchased_tours")
        .delete()
        .eq("id", purchased_id);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(retrievePurchasedTours(user_id));
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
    changeConfirmingPopup: (state, action) => {
      state.isConfirmingPurchase = action.payload;
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
      .addCase(retrievePurchasedTours.pending, (state) => {
        state.isRetrieving = true;
        state.error = "";
      })
      .addCase(retrievePurchasedTours.fulfilled, (state, action) => {
        state.purchasedTours = action.payload;
        state.isRetrieving = false;
        state.error = "";
      })
      .addCase(retrievePurchasedTours.rejected, (state, action) => {
        state.isRetrieving = false;
        state.error = action.payload as string;
      })
      .addCase(addPurchasedTour.pending, (state) => {
        state.isPurchasing = true;
        state.error = "";
      })
      .addCase(addPurchasedTour.fulfilled, (state) => {
        state.isPurchasing = false;
        state.error = "";
      })
      .addCase(addPurchasedTour.rejected, (state, action) => {
        state.isPurchasing = false;
        state.error = action.payload as string;
      })
      .addCase(deletePurchasedTour.pending, (state) => {
        state.isDeleting = true;
        state.error = "";
      })
      .addCase(deletePurchasedTour.fulfilled, (state) => {
        state.isDeleting = false;
        state.error = "";
      })
      .addCase(deletePurchasedTour.rejected, (state, action) => {
        state.isDeleting = false;
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
export const { noUsers, changeConfirmingPopup } = userToursSlice.actions;
export default userToursSlice.reducer;
