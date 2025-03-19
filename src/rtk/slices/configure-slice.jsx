import { createSlice } from "@reduxjs/toolkit";

const configureSlice = createSlice({
  initialState: "http://deliveryodai.mooo.com/",
  name: "configureSlice",
  reducers: {},
});

export const {} = configureSlice.actions;
export default configureSlice.reducer;
