import { combineReducers, configureStore } from "@reduxjs/toolkit";
import acidsReducer from "./slices/acidsSlice";

const rootReducer = combineReducers({
    acidsData: acidsReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;