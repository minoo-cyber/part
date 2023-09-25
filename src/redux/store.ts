// src/redux/store.js
import { CombinedState, configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./slices";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
// import thunk from 'redux-thunk';

const persistConfig: PersistConfig<CombinedState<RootState>, any, any, any> = {
  key: "root",
  storage,
  blacklist: ["toast"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [
    /* thunk */
  ],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
