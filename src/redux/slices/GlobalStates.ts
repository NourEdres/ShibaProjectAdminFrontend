import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Location } from "../models/Interfaces";

interface GlobalStates {
  selectedCard: any;
  page: string;
  sectorColor: string;
  location: Location | null;
  sector: Admin | null;
  // location: Location | null;
}

const initialState: GlobalStates = {
  selectedCard: {},
  page: '',
  sectorColor: "red",
  location: null,
  sector: null,
  // unit: null,
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
    setSectorColor(state, action: PayloadAction<string>) {
      state.sectorColor = action.payload;
    },
    setSector(state, action: PayloadAction<Admin>){
      state.sector = action.payload;
    }
  },
});

export const { setCard, setPage, setSectorColor, setSector } = globalStatesSlice.actions;

export default globalStatesSlice.reducer;


