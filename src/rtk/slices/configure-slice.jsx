import { createSlice } from "@reduxjs/toolkit";

const configureSlice = createSlice({
  initialState: "http://odaidelivery.atwebpages.com/",
  name: "configureSlice",
  reducers: {},
});

export const {} = configureSlice.actions;
export default configureSlice.reducer;
