import { combineReducers, configureStore } from "@reduxjs/toolkit";
import acidsReducer from "./slices/acidsSlice";
import authReducer from "./slices/authSlice";
import carbonateReducer from "./slices/carbonateSlice";

const rootReducer = combineReducers({
    acidsData: acidsReducer,
    auth: authReducer,
    carbonateData: carbonateReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;