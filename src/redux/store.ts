import { CombinedState, configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./slices";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

const persistConfig: PersistConfig<CombinedState<RootState>, any, any, any> = {
  key: "root",
  storage,
  whitelist: ["addTask"],
  blacklist: ["toast", "doneTask"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
