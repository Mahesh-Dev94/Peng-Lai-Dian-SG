import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../Reducers/sessionSlice';
import languageReducer from '../Reducers/languageSlice';
import configReducers from '../Reducers/config';
import refresh from '../Reducers/refresh';

const store = configureStore({
  reducer: {
    session: sessionReducer,
	 language: languageReducer,
   config:configReducers,
   refresh: refresh,
    // Add more reducers if needed
  },
});

export default store;