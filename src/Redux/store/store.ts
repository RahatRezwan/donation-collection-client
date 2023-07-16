import { configureStore } from '@reduxjs/toolkit';
import donorReducer from '../features/donorSlice/donorSlice';
import donationReducer from '../features/donationSlice/donationSlice';
// ...

const store = configureStore({
   reducer: {
      donors: donorReducer,
      donations: donationReducer,
   },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
