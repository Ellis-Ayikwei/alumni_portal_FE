import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import logOutSlice from './logOutSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    logout: logOutSlice,
});

const confStore: Store = configureStore({
    reducer: rootReducer,
});
export default confStore;
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof confStore.dispatch;
