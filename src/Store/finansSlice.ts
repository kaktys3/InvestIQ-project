import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AnalyticsResponse, Profile, Transaction } from "./interface";
// import type {Category} from "./interface";
import { analiticData, loginUser, marketRate, registerUser } from "./dataScript";

const profileAdapter = createEntityAdapter<Profile>()
// const categoryAdapter = createEntityAdapter<Category>()
const transactionAdapter = createEntityAdapter<Transaction>()
const analiticStateAdapter = createEntityAdapter<AnalyticsResponse>()

const initialState = {
    profiles: profileAdapter.getInitialState(),
    // category: categoryAdapter.getInitialState(),
    transaction: transactionAdapter.getInitialState(),
    market: {},
    monthlyAnalitic: analiticStateAdapter.getInitialState(),
    loading: false,
    error: null,
}


const analiticUserInvestsReduser = createSlice({
    name: 'analiticUserInvests',
    initialState,
    reducers: {
        transactionOnDay: () => {

        }
    },
    extraReducers: builder => {
        builder

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                profileAdapter.setAll(state.profiles, [action.payload.profile])
                // categoryAdapter.setAll(state.category, [action.payload.categories])
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                analiticStateAdapter.setAll(state.monthlyAnalitic, [action.payload.monthlyAnalitic])
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                profileAdapter.setAll(state.profiles, [action.payload.profile])
                // categoryAdapter.setAll(state.category, [action.payload.categories])
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                analiticStateAdapter.setAll(state.monthlyAnalitic, [action.payload.monthlyAnalitic])
            })

            .addCase(marketRate.fulfilled, (state, action) => {
                state.loading = false
                state.market = action.payload
            })

            .addCase(analiticData.fulfilled, (state, action) => {
                analiticStateAdapter.setAll(state.monthlyAnalitic, [action.payload])
            })

            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<any>) => {
                    state.loading = false
                    state.error = action.payload || 'щось пішло не так'
                }
            )

            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true
                }
            )
    }

})

export default analiticUserInvestsReduser.reducer

