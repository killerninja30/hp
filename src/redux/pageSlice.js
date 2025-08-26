import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: "",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = pageSlice.actions;
export default pageSlice.reducer;
