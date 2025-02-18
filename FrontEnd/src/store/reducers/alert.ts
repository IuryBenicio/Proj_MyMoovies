import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  type: " " | "success" | "error" | "secondary";
  messageText: string;
  showMessage: boolean;
};

const initialState: stateType = {
  type: " ",
  messageText: " ",
  showMessage: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert(state, payload: PayloadAction<stateType>) {
      state.type = payload.payload.type;
      state.messageText = payload.payload.messageText;
      state.showMessage = true;
    },
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
