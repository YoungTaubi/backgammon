'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';
// import { initializeCount } from '../lib/features/counter/counterSlice';

export default function StoreProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>
}