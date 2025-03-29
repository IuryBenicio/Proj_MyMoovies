import { configureStore } from "@reduxjs/toolkit";
import navBarReducer from "./reducers/navbar";
import searchMooviesReducer from "./reducers/search";
import userReducer from "./reducers/user";
import alertReducer from "./reducers/alert";
export const store = configureStore({
  reducer: {
    navBar: navBarReducer,
    searchMoovies: searchMooviesReducer,
    user: userReducer,
    alert: alertReducer,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
