import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore, createMigrate } from "redux-persist"
// import storage from "redux-persist/lib/storage"
import storage from "./persistStorage"; // 👈 SSR-safe storage shim
import authReducer from "./reducer/authReducer"
import cartReducer from "./reducer/cartReducer"
import { authApi } from "./services/authApi";

const rootReducer = combineReducers({
    authStore: authReducer,
    cartStore: cartReducer,
      [authApi.reducerPath]: authApi.reducer,  // ✅ agar API slice use karna ho future me

})


// One-time migration: previously we persisted a single reducer with root key `auth`.
// New combined reducer uses `authStore`. Migrate persisted state accordingly.
const migrations = {
    1: (state) => {
        if (!state) return state;
        // If old root-level `auth` exists and new `authStore` is missing, move it and drop the legacy key
        if (state.auth !== undefined && state.authStore === undefined) {
            const { auth, ...rest } = state;
            return {
                ...rest,
                authStore: { auth: auth ?? null },
            };
        }
        return state;
    },
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage, // use SSR-safe storage shim
    whitelist: ["authStore", "cartStore"],
    migrate: createMigrate(migrations, { debug: false }),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(authApi.middleware),
})

export const persistor = persistStore(store)