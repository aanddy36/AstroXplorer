import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";
import { ILogin, INewUser } from "../../moduls";

type IAuth = {
  isLoggedIn: boolean;
  isLoading: boolean;
  id: string;
  errorLogin: string;
  errorSignup: string;
  name: string;
  surname: string;
  isRegistering: boolean;
};

const initialState: IAuth = {
  isLoggedIn: false,
  isLoading: false,
  id: "",
  errorLogin: "",
  errorSignup: "",
  name: "",
  surname: "",
  isRegistering: false,
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
        return thunkAPI.rejectWithValue(error.message);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (
    {
      signupName: name,
      signupSurname: surname,
      signupEmail: email,
      signupPassword: password,
    }: INewUser,
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, surname } },
      });
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return data;
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
        return thunkAPI.rejectWithValue(error.message);
      }
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
  reducers: {
    resetErrors: (state)=>{
      state.errorLogin = "",
      state.errorSignup = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorLogin = "";
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload?.user.role === "authenticated";
        state.id = action.payload.user.id;
        state.errorLogin = "";
        state.name = action.payload.user.user_metadata.name;
        state.surname = action.payload.user.user_metadata.surname;
      })
      .addCase(login.rejected, (state,action) => {
        console.log(action.payload);
        
        state.isLoading = false;
        state.errorLogin = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.errorLogin = "";
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload?.user.role === "authenticated";
        state.id = action.payload?.user.id as string;
        state.errorLogin = "";
        state.name = action.payload?.user.user_metadata.name;
        state.surname = action.payload?.user.user_metadata.surname;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLogin = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(createUser.pending, (state) => {        
        state.isRegistering = true;
        state.errorSignup = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isRegistering = false;
        state.isLoggedIn = action.payload.user?.role === "authenticated";
        state.id = action.payload?.user?.id as string;
        state.errorSignup = "";
        state.name = action.payload?.user?.user_metadata.name;
        state.surname = action.payload?.user?.user_metadata.surname;
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log(action.payload);
        state.isRegistering = false;
        state.errorSignup = action.payload as string;
      });
  },
});

export const {resetErrors} = authSlice.actions
export default authSlice.reducer;
