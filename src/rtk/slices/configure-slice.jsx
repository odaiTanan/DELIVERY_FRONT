import { createSlice } from "@reduxjs/toolkit";

const configureSlice = createSlice({
  //initialState: "https://corsproxy.io/http://deliveryodai.mooo.com/",
  initialState: "http://localhost/resturantpost/",
  name: "configureSlice",
  reducers: {},
});

export const {} = configureSlice.actions;
export default configureSlice.reducer;
