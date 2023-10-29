import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";
import { ILogin } from "../../moduls";

type IAuth = {
  isLoggedIn: boolean;
  isLoading: boolean;
  id: string;
  error: boolean;
  name: string;
  surname: string;
};

const initialState: IAuth = {
  isLoggedIn: false,
  isLoading: false,
  id: "",
  error: false,
  name: "",
  surname: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ loginEmail, loginPassword }: ILogin, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      thunkAPI.dispatch(retrieveNames(data.user.id));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const retrieveNames = createAsyncThunk(
  "auth/retrieveNames",
  async (id: string, thunkAPI) => {
    try {
      const { data: usersInfo, error } = await supabase
        .from("usersInfo")
        .select("name,surname")
        .eq("users_id", id);
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return usersInfo;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return null;
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      thunkAPI.dispatch(retrieveNames(data.user.id));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload?.user.role === "authenticated";
        state.id = action.payload.user.id;
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.isLoggedIn = false;
      })
      .addCase(retrieveNames.fulfilled, (state, action) => {
        console.log(action.payload[0]);
        state.name = action.payload[0].name;
        state.surname = action.payload[0].surname;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.isLoggedIn = action.payload?.user.role === "authenticated";
        state.id = action.payload?.user.id as string;
        state.error = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState };
      });
  },
});

//export const { logout } = authSlice.actions;
export default authSlice.reducer;
