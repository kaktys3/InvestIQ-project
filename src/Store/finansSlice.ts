import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "./interface";
import { deletTransaction, loginUser, marketRate, outLoginUser, registerUser, updataData } from "./dataScript";

export const transactionAdapter = createEntityAdapter<Transaction>()

const initialState = {
    profiles: {},
    transaction: transactionAdapter.getInitialState(),
    market: {},
    monthlyAnalitic: {},
    transactionStatistic: {},
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
                state.profiles = action.payload.profile
                state.transactionStatistic = action.payload.statisticTransaction
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                state.monthlyAnalitic = action.payload.monthlyAnalitic
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.profiles = action.payload.profile
                state.transactionStatistic = action.payload.statisticTransaction
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                state.monthlyAnalitic = action.payload.monthlyAnalitic
            })

            .addCase(marketRate.fulfilled, (state, action) => {
                state.loading = false
                state.market = action.payload
            })

            .addCase(deletTransaction.fulfilled, (state, action) => {
                state.loading = false
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                state.transactionStatistic = action.payload.statisticTransaction
                state.monthlyAnalitic = action.payload.monthlyAnalitic
            })

            .addCase(outLoginUser.fulfilled, (state, action) => {
                state.loading = false
                state.profiles = action.payload.profile
                state.transactionStatistic = action.payload.statisticTransaction
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                state.monthlyAnalitic = action.payload.monthlyAnalitic
            })

            .addCase(updataData.fulfilled, (state, action) => {
                state.loading = false
                state.transactionStatistic = action.payload.statisticTransaction
                transactionAdapter.setAll(state.transaction, action.payload.transactions)
                state.monthlyAnalitic = action.payload.monthlyAnalitic
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

