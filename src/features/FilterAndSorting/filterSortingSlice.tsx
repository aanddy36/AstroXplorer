import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterButtons, Filters, ISorting, ITours } from "../../moduls";
import supabase from "../../services/supabase";
import { filterAndSort } from "../../services/useFilters";

type IFilterSorting = {
  searchText: string;
  isFixed: boolean;
  page: number;
  areTheyOpen: FilterButtons;
  addedFilters: Filters[];
  currentSorting: ISorting;
  allTours: ITours[];
  filteredTours: ITours[];
  isLoading: boolean;
  error: any;
};

const initialState: IFilterSorting = {
  searchText: "",
  isFixed: false,
  page: 1,
  areTheyOpen: {
    price: false,
    groupSize: false,
    duration: false,
    bodyType: false,
    sort: false,
  },
  addedFilters: [],
  filteredTours: [],
  currentSorting: "Featured",
  allTours: [],
  isLoading: false,
  error: null,
};
export const getAllTours = createAsyncThunk(
  "tours/getMyTours",
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("tours_and_reviews")
        .select("*");
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const filterSortingSlice = createSlice({
  name: "filterSorting",
  initialState,
  reducers: {
    changeText: (state, { payload }) => {
      state.searchText = payload;
      state.addedFilters = [];
      state.page = initialState.page;
      state.filteredTours = (
        filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
        ) as ITours[]
      )?.filter((tour: ITours) =>
        tour.title?.toLocaleLowerCase().includes(payload.toLowerCase())
      );
    },
    cleanSearchBar: (state) => {
      state.searchText = "";
      state.filteredTours = filterAndSort(
        state.addedFilters,
        state.currentSorting,
        state.allTours
      ) as ITours[];
      state.page = initialState.page;
    },
    toggleFixing: (state, { payload }) => {
      state.isFixed = payload;
    },
    resetPages: (state) => {
      state.page = initialState.page;
      state.isFixed = initialState.isFixed;
      state.searchText = initialState.searchText;
    },
    changePage: (state, { payload }: { payload: "next" | "previous" }) => {
      if (payload === "next") {
        state.page += 1;
      } else {
        state.page -= 1;
      }
    },
    closeThemAll: (state) => {
      state.areTheyOpen = initialState.areTheyOpen;
    },
    openOneOfThem: (state, { payload }) => {
      return {
        ...state,
        areTheyOpen: {
          ...initialState.areTheyOpen,
          [payload]: !state.areTheyOpen[payload],
        },
      };
    },
    clearAllFilters: (state) => {
      state.addedFilters = [];
      state.page = initialState.page;
      state.filteredTours = filterAndSort(
        state.addedFilters,
        state.currentSorting,
        state.allTours
      ) as ITours[];
    },
    addOrDeleteFilter: (state, { payload }: { payload: Filters }) => {
      if (state.addedFilters.includes(payload)) {
        state.addedFilters = state.addedFilters.filter(
          (filter) => filter !== payload
        );
      } else {
        state.addedFilters.push(payload);
      }
      state.filteredTours = filterAndSort(
        state.addedFilters,
        state.currentSorting,
        state.allTours
      ) as ITours[];
      state.searchText = "";
    },
    changeCurrentSorting: (state, { payload }: { payload: ISorting }) => {
      state.currentSorting = payload;
      state.searchText = initialState.searchText;
      state.filteredTours = filterAndSort(
        state.addedFilters,
        state.currentSorting,
        state.allTours
      ) as ITours[];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTours = action.payload;
        state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          action.payload
        ) as ITours[];
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetPages,
  changePage,
  closeThemAll,
  openOneOfThem,
  clearAllFilters,
  addOrDeleteFilter,
  changeCurrentSorting,
  changeText,
  cleanSearchBar,
  toggleFixing,
} = filterSortingSlice.actions;
export default filterSortingSlice.reducer;
