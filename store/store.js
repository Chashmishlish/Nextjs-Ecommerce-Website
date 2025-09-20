import { combineReducers, configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import localStorage from "redux-persist/es/storage"
// import storage from "redux-persist/lib/storage"
import storage from "./persistStorage"; // 👈 fix for SSR
import authReducer from "./reducer/authReducer"
import cartReducer from "./reducer/cartReducer"
import { authApi } from "./services/authApi";

const rootReducer = combineReducers({
    authStore: authReducer,
    cartStore: cartReducer,
      [authApi.reducerPath]: authApi.reducer,  // ✅ agar API slice use karna ho future me

})


const persistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ["authStore", "cartStore"], // ✅ ab cart bhi persist hoga

    //   whitelist: ["auth"], // ✅ only persist auth slice

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
    .concat(authApi.middleware),  // ✅ agar RTK Query ka API use karna ho

})

export const persistor = persistStore(store)