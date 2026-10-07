import { transactionAdapter } from "./finansSlice.ts";
import type { RootState } from "./index.ts";

export const selectState  = (state: RootState) => state.finans.transaction
export const profile  = (state: RootState) => state.finans.profiles
export const market  = (state: RootState) => state.finans.market
export const monthlyAnalitic  = (state: RootState) => state.finans.monthlyAnalitic
export const statisticCategory  = (state: RootState) => state.finans.transactionStatistic
export const loading  = (state: RootState) => state.finans.loading

export const {
    selectAll: selectAllTransaction,
    selectById: selectTransactionById,
    selectTotal: selectTotalTransaction,
    selectIds: selectTransactionIds,
} = transactionAdapter.getSelectors(selectState);