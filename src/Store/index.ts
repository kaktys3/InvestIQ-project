import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import analiticUserInvestsReducer from './finansSlice'; // прибрали .ts та виправили Reduser

const storage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};
// 1. Створюємо корневий редьюсер
export const rootReducer = combineReducers({
  finans: analiticUserInvestsReducer,
});

// 2. Налаштування persist (з можливістю вибору слайсів)
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['finans'], // розкоментуй і вкажи слайси, які дійсно треба зберігати локально
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Конфігурація Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// 4. Правильна типізація RootState від rootReducer, а не від store.getState
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// 5. Правильні кастомні хуки
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;