import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth';

const store = configureStore({
	reducer: {
		authReducer
	},
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
