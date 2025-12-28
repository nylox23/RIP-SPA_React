import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { Acid } from "../modules/types";
import type { RootState } from "../store";

interface AcidsState {
    Data: Acid[];
    SearchTerm: string;
}

const initialState: AcidsState = {
    Data: [],
    SearchTerm: ''
};

const acidsSlice = createSlice({
    name: "acids",
    initialState,
    reducers: {
        setAcids(state, action: PayloadAction<Acid[]>) {
            state.Data = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.SearchTerm = action.payload;
        }
    }
});

export const useAcidsList = () =>
    useSelector((state: RootState) => state.acidsData.Data);

export const useSearchTerm = () =>
    useSelector((state: RootState) => state.acidsData.SearchTerm);

export const {
    setAcids: setAcidsAction,
    setSearchTerm: setSearchTermAction
} = acidsSlice.actions;

export default acidsSlice.reducer;