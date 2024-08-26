import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice";
import chatReducer from "./features/chatSlice";
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    userSelector: userReducer,
    chatSelector: chatReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;