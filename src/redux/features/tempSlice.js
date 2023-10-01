import { createSlice } from "@reduxjs/toolkit";

const tempSlice = createSlice({
  name: "tempSlice", // Change the slice name here
  initialState: {
    resumeTemplateSelect: {},
    temp2: null,
  },
  reducers: {
    setResumeTemplateSelect: (state, action) => {
      state.resumeTemplateSelect = action.payload;
    },
    setTemp2: (state, action) => {
      state.temp2 = action.payload;
    },
  },
});

export const { setResumeTemplateSelect, setTemp2 } = tempSlice.actions;

export default tempSlice.reducer;
