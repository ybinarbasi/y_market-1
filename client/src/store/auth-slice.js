import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: null
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;

    },
  }
});

export const { loginStart, loginSuccess, loginFailure,registerStart, registerSuccess, registerFailure ,logout} = authSlice.actions;

export default authSlice;