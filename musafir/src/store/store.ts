import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { musafirApi } from "./musafirApi";
import { loginSlice } from "./slice/LoginSlice";
import { counterSlice } from "./slice/CounterSlice";

const rootReducer = combineReducers({
  [musafirApi.reducerPath]: musafirApi.reducer,
  loginSlice: loginSlice.reducer,
  counterSlice: counterSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginSlice", "counterSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(musafirApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
