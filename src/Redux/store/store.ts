import { configureStore } from '@reduxjs/toolkit';
import donorReducer from '../features/donorSlice/donorSlice';
// ...

const store = configureStore({
   reducer: {
      donors: donorReducer,
   },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
