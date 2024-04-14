import { configureStore } from "@reduxjs/toolkit";
import GlobalStatesReducer from "./slices/GlobalStates";

const store = configureStore({
  reducer: {
    globalStates: GlobalStatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
