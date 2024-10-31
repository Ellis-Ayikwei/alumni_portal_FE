import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import logInSlice from './logInSlice';
import logOutSlice from './logOutSlice';
import themeConfigSlice from './themeConfigSlice';
import usersSlice from './usersSlice';
import insurancePackagesSlice from './insurancePackageSlice'

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import alumniGroupSlice from './alumnigroupSlice';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Combine your reducers
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    logout: logOutSlice,
    login: logInSlice,
    usersdata: usersSlice,
    alumnidata: alumniGroupSlice,
    insurancePackages: insurancePackagesSlice,
});

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const confStore: Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Avoid errors with redux-persist actions
            },
        }),
});

export default confStore;

// Persistor for persisting the store
const persistor = persistStore(confStore);

export { persistor };

// Type definitions
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof confStore.dispatch;
