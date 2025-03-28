import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

// Sign in or up
export const addUser = createAsyncThunk(
  "userSlice/addUser",
  async ({ formData, baseUrl, InOrUp }, { rejectWithValue }) => {
    try {
      console.log("called");
      const cookie = new Cookies();
      cookie.remove("token");
      cookie.remove("rule");
      let res = "";
      res = await axios.post(`${baseUrl}auth/sign${InOrUp}.php`, formData)

      const result = await res.data;
      return result; 
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

// Refresh user authentication
export const refresh = createAsyncThunk(
  "userSlice/refresh",
  async ({ baseUrl, token }, { rejectWithValue }) => {
    try {
      const cookie = new Cookies();
      if (!token) {
        token = await cookie.get("token");
      }
      await cookie.remove("token");
      await cookie.remove("rule");
      let res = "";
      const formData = new FormData();
      formData.append("token", token);
      res = await axios.post(`${baseUrl}refresh.php`, formData);
      const result = await res.data;
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userSlice = createSlice({
  initialState: { user: null, loading: false, error: null },
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const token = action.payload.token;
        const rule = action.payload.rule;
        const cookie = new Cookies();
        cookie.set("token", token,{ path: "/" });
        cookie.set("rule", rule,{ path: "/" });
        return { error: false, loading: false, user: action.payload };
      })
      .addCase(addUser.rejected, (state, action) => {
        return { ...state, error: true, loading: false };
      })
      .addCase(refresh.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(refresh.fulfilled, (state, action) => {
        const token = action.payload.token;
        const rule = action.payload.rule;
        const cookie = new Cookies();
        cookie.set("token", token, { path: "/" });
        cookie.set("rule", rule, { path: "/" });
        return { error: false, loading: false, user: action.payload };
      })
      .addCase(refresh.rejected, (state, action) => {
        return { ...state, loading: false, error: true };
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
