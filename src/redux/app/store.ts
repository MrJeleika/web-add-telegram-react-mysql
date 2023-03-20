import { configureStore } from '@reduxjs/toolkit'
import appSlice from '../slice/appSlice'
import { apiSlice } from '../api/appAPI'

export const store = configureStore({
  reducer: {
    app: appSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    )
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
