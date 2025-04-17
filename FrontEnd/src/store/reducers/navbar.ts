import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  navBar: "Login&Register" | "Home" | "Perfil" | "Amigos";
  night: boolean;
};

const initialState: stateType = {
  navBar: "Home",
  night: true,
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    changeNavBar(state, action) {
      state.navBar = action.payload;
    },
    changeMode(state, action: PayloadAction<boolean>) {
      state.night = action.payload;
    },
  },
});

export const { changeNavBar, changeMode } = navBarSlice.actions;
export default navBarSlice.reducer;
