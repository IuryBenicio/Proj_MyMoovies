import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  navBar: "Login&Register" | "Home" | "Perfil" | "Amigos";
};

const initialState: stateType = {
  navBar: "Home",
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    changeNavBar(state, action) {
      state.navBar = action.payload;
    },
  },
});

export const { changeNavBar } = navBarSlice.actions;
export default navBarSlice.reducer;
