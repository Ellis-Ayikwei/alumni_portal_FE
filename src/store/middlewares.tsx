const logoutMiddleware = (store) => (next) => (action) => {
    if (action.type === 'auth/LogoutUser/fulfilled' || action.type === 'auth/resetAuth') {
        // Clear persisted state
        persistor.purge();

        // Clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    return next(action);
};