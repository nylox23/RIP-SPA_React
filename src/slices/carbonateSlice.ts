import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import type {
    DtoCarbonateDetailResponse,
    DtoCarbonateListEntry
} from '../api/Api';

interface CarbonateState {
    currentCarbonateId: number | null;
    currentAcidCount: number;
    detail: DtoCarbonateDetailResponse | null;
    list: DtoCarbonateListEntry[];
    loading: boolean;
    error: string | null;
}

const initialState: CarbonateState = {
    currentCarbonateId: null,
    currentAcidCount: 0,
    detail: null,
    list: [],
    loading: false,
    error: null,
};

export const fetchCurrentCarbonateInfo = createAsyncThunk(
    'carbonates/fetchCurrentInfo',
    async () => {
        const response = await api.api.carbonatesCurrentList();
        return response.data;
    }
);

export const fetchCarbonatesList = createAsyncThunk(
    'carbonates/fetchList',
    async (filters: { status?: string; date_from?: string; date_to?: string } = {}) => {
        const response = await api.api.carbonatesList(filters);
        return response.data.carbonates || [];
    }
);

export const fetchCarbonateDetail = createAsyncThunk(
    'carbonates/fetchDetail',
    async (id: number) => {
        const response = await api.api.carbonatesDetail(id);
        return response.data;
    }
);

export const addAcidToCarbonate = createAsyncThunk(
    'carbonates/addAcid',
    async (acidId: number, { dispatch }) => {
        await api.api.acidsToCarbonateCreate(acidId);
        dispatch(fetchCurrentCarbonateInfo());
    }
);

export const removeAcidFromCarbonate = createAsyncThunk(
    'carbonates/removeAcid',
    async (acidId: number, { dispatch, getState }) => {
        await api.api.carbonateAcidsDelete(acidId);

        const state = getState() as any;
        if (state.carbonateData.detail?.id) {
            dispatch(fetchCarbonateDetail(state.carbonateData.detail.id));
        }
    }
);

export const updateAcidMass = createAsyncThunk(
    'carbonates/updateAcidMass',
    async ({ id, mass }: { id: number, mass: number }, { dispatch, getState }) => {
        await api.api.carbonateAcidsUpdate(id, { mass });

        const state = getState() as any;
        if (state.carbonateData.detail?.id) {
            dispatch(fetchCarbonateDetail(state.carbonateData.detail.id));
        }
    }
);

export const updateCarbonateMass = createAsyncThunk(
    'carbonates/updateCarbonateMass',
    async (mass: number, { dispatch, getState }) => {
        await api.api.carbonatesUpdate({ mass });

        const state = getState() as any;
        if (state.carbonateData.detail?.id) {
            dispatch(fetchCarbonateDetail(state.carbonateData.detail.id));
        }
    }
);

export const submitCarbonateForm = createAsyncThunk(
    'carbonates/submitForm',
    async (_, { dispatch }) => {
        await api.api.carbonatesFormUpdate();
        dispatch(fetchCurrentCarbonateInfo());
    }
);

export const deleteCarbonate = createAsyncThunk(
    'carbonates/delete',
    async (id: number, { dispatch }) => {
        await api.api.carbonatesDelete(id);
        dispatch(fetchCurrentCarbonateInfo());
    }
);

const carbonateSlice = createSlice({
    name: 'carbonates',
    initialState,
    reducers: {
        resetDetail: (state) => { state.detail = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentCarbonateInfo.fulfilled, (state, action) => {
                state.currentCarbonateId = action.payload.carbonate_id || null;
                state.currentAcidCount = action.payload.acid_count || 0;
            })
            .addCase(fetchCarbonatesList.pending, (state) => { state.loading = true; })
            .addCase(fetchCarbonatesList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCarbonateDetail.pending, (state) => { state.loading = true; })
            .addCase(fetchCarbonateDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.detail = action.payload;
            })
            .addCase(submitCarbonateForm.fulfilled, (state) => {
                state.currentCarbonateId = null;
                state.currentAcidCount = 0;
                state.detail = null;
            })
            .addMatcher(
                (action) => action.type === 'auth/logout/fulfilled',
                (state) => {
                    state.currentCarbonateId = null;
                    state.currentAcidCount = 0;
                    state.detail = null;
                    state.list = [];
                }
            );
    }
});

export const { resetDetail } = carbonateSlice.actions;
export default carbonateSlice.reducer;

export const setCarbonateStatus = createAsyncThunk(
    'carbonates/setStatus',
    async ({ id, status }: { id: number, status: string }) => {
        await api.api.carbonatesStatusUpdate(id, { status });
    }
);