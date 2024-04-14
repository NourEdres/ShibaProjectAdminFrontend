import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStates {
  selectedCard: any;
  page: string;
}

const initialState: GlobalStates = {
  selectedCard: {},
  page: "home",
};

const globalStatesSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<any>) {
      state.selectedCard = action.payload;
    },
    setPage(state, action: PayloadAction<any>) {
      state.page = action.payload;
    },
  },
});

export const { setCard, setPage } = globalStatesSlice.actions;

export default globalStatesSlice.reducer;
