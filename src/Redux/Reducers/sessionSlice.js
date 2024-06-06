// Step 1: Redux Toolkit Setup
import { createSlice } from '@reduxjs/toolkit';

// Step 2: AsyncStorage Integration
import AsyncStorage from '@react-native-async-storage/async-storage';

// Step 3: Redux Toolkit Slice
const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      const updatedUsersData = action.payload; // Extracting the users object from the payload
      state.user.users = {
        ...state.user.users,
        ...updatedUsersData,
      };
    },
  },
});

// Step 4: Combine AsyncStorage and Redux Toolkit
export const { login, logout,updateUser } = sessionSlice.actions;

// Async action to persist session data in AsyncStorage and update Redux state
export const persistLogin = (userData) => async (dispatch) => {
  try {
    // Dispatch login action to update Redux state
    dispatch(login(userData));
    // Save user session data to AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    
  } catch (error) {
    console.error('Error persisting login:', error);
  }
};

// Async action to remove session data from AsyncStorage and update Redux state
export const persistLogout = () => async (dispatch) => {
  try {
    // Remove user session data from AsyncStorage
    await AsyncStorage.removeItem('userData');
    // Dispatch logout action to update Redux state
    dispatch(logout());
  } catch (error) {
    console.error('Error persisting logout:', error);
  }
};

// Async action to fetch session data from AsyncStorage and update Redux state
export const getSessionData = () => async (dispatch) => {
	try {
	  // Fetch user session data from AsyncStorage
	  const userDataString = await AsyncStorage.getItem('userData');
	  if (userDataString) {
		const userData = JSON.parse(userDataString);
		// Dispatch login action to update Redux state with fetched session data
		dispatch(login(userData));
	  }
	} catch (error) {
	  console.error('Error fetching session data:', error);
	}
  };
 
  export const persistUpdateUser = (userData) => async (dispatch) => {
    try {
       // Get current session data from AsyncStorage
    const sessionDataString = await AsyncStorage.getItem('userData');
    if (sessionDataString) {
      // Parse the session data from AsyncStorage
      const sessionData = JSON.parse(sessionDataString);
      // console.log('sessionData--',sessionData)
      // Merge the updated user data into the session data
      const updatedSessionData = {
          ...sessionData,
          users: {
            ...sessionData.users,
            ...userData,
          },
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedSessionData));
    }

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  

export default sessionSlice.reducer; 