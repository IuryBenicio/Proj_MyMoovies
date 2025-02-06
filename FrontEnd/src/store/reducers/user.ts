import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userType = {
  userName: string;
  name: string;
  email: string;
  password: string;
  movies: [];
};

type stateType = {
  user: {
    userName: string;
    name: string;
    email: string;
    password: string;
    movies: [];
  };
};

const initialState: stateType = {
  user: {
    userName: "",
    name: "",
    email: "",
    password: "",
    movies: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<userType>) {
      state.user = action.payload;
    },
    addMovieToUser(state, action: PayloadAction<string>) {
      if (action.payload.length > 0) {
        state.user.movies.push(action.payload);
      }
    },
    logout(state) {
      state.user = initialState.user;
    },
  },
});

export const { addUser, addMovieToUser, logout } = userSlice.actions;
export default userSlice.reducer;
