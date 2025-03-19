import { createSlice } from "@reduxjs/toolkit";

const configureSlice = createSlice({
  initialState: "https://cors-anywhere.herokuapp.com/http://deliveryodai.mooo.com/",
  name: "configureSlice",
  reducers: {},
});

export const {} = configureSlice.actions;
export default configureSlice.reducer;
