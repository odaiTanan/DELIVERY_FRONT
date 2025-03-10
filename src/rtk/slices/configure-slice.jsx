import { createSlice } from "@reduxjs/toolkit";

const configureSlice = createSlice({
  initialState: "/.netlify/functions/proxy/",
  name: "configureSlice",
  reducers: {},
});

export const {} = configureSlice.actions;
export default configureSlice.reducer;
