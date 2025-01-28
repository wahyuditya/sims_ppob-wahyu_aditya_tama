import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./slices/authSlice";
import servicesReducer from "./slices/servicesSlice";
import bannersReducer from "./slices/bannerSlice";
import selectedServiceReducer from "./slices/selectedServiceSlice";
import storage from "redux-persist/es/storage";

// Persist redux state
const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  banners: bannersReducer,
  selectedService: selectedServiceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
