import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userType = {
  _id: string;
  userName: string;
  name: string;
  email: string;
  password?: string;
  movies: string[];
  profileImage: {
    public_id: string;
    path: string;
  };
};

type stateType = {
  user: {
    _id: string;
    userName: string;
    name: string;
    email: string;
    password?: string;
    movies: string[];
    profileImage: {
      public_id: string;
      path: string;
    };
  };
  authenticated: boolean;
};

const initialState: stateType = {
  user: {
    _id: "",
    userName: "",
    name: "",
    email: "",
    password: "",
    movies: [],
    profileImage: {
      public_id: "",
      path: "",
    },
  },
  authenticated: false,
};

type imageType = {
  public_id: "";
  path: "";
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<userType>) {
      state.user = action.payload;
      state.authenticated = true;
    },
    addMovieToUser(state, action: PayloadAction<string>) {
      if (action.payload.length > 0) {
        state.user.movies.push(action.payload);
      }
    },
    updateName(state, action: PayloadAction<string>) {
      state.user.name = action.payload
        .split("")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    updateEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    updateUsername(state, action: PayloadAction<string>) {
      state.user.userName = action.payload;
    },
    logout(state) {
      state.user.name = "";
      state.user.email = "";
      state.user.password = "";
      state.user.movies = [];
      state.user.userName = "";
      state.user.profileImage = {
        public_id: "",
        path: "",
      };
      state.authenticated = false;
    },
    updateImage(state, action: PayloadAction<imageType>) {
      state.user.profileImage.path = action.payload.path;
      state.user.profileImage.public_id = action.payload.public_id;
    },
  },
});

export const {
  addUser,
  addMovieToUser,
  updateName,
  updateEmail,
  updateUsername,
  logout,
  updateImage,
} = userSlice.actions;
export default userSlice.reducer;
