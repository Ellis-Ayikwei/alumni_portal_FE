import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import logInSlice from './logInSlice';
import logOutSlice from './logOutSlice';
import themeConfigSlice from './themeConfigSlice';
import usersSlice from './usersSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    logout: logOutSlice,
    login: logInSlice,
    usersdata: usersSlice,
});

const confStore: Store = configureStore({
    reducer: rootReducer,
});
export default confStore;
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof confStore.dispatch;
