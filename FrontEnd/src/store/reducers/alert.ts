import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type stateType = {
  type: " " | "success" | "error" | "secondary";
  messageText: string;
  showMessage?: boolean;
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
    setAlert(state, action: PayloadAction<stateType>) {
      state.type = action.payload.type;
      state.messageText = action.payload.messageText;
      state.showMessage = true;
    },
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
