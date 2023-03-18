import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: 0,
  },
  reducers: {
    login: (state, action) =>{
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const {login,logout, setUser} = userSlice.actions;
export const selectUser = (state) =>state.user.user;
export default userSlice.reducer;