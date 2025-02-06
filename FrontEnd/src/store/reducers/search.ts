import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  moovie: moovieType;
};

export type moovieType = {
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

const initialState: stateType = {
  moovie: {},
};

const searchMoviesSlice = createSlice({
  name: "searchMoovie",
  initialState,
  reducers: {
    addMoovies(state, action: PayloadAction<moovieType>) {
      state.moovie = action.payload;
    },
  },
});

export const { addMoovies } = searchMoviesSlice.actions;
export default searchMoviesSlice.reducer;
