import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import analiticUserInvestsReduser from './finansSlice.ts'

export const store = configureStore({
  reducer: {
    finans: analiticUserInvestsReduser
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();