import { createSlice } from "@reduxjs/toolkit";

const configureSlice = createSlice({
  initialState: "https://odaidelivery.atwebpages.com/",
  name: "configureSlice",
  reducers: {},
});

export const {} = configureSlice.actions;
export default configureSlice.reducer;
