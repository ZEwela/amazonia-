import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signin = createAsyncThunk('user/signin', async (args, {rejectWithValue}) => {
    const {email, password} = args;
    try {
      const response = await axios.post("/api/users/signin", {email, password});
      const data = response.data;
      return data;
    } catch (error) {
      return  rejectWithValue(error.response.data.message)
    }
})
export const register = createAsyncThunk('user/register', async (args) => {
  const {name, email, password} = args;
  const response = await axios.post("/api/users/register", {name, email, password});
  const data = response.data;
  return data;
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userInfo: [],
    error: null, 
  },
  reducers: {
    setUserFromCookie: (state, action) => {
        state.userInfo = action.payload
    },
    signout: (state) => {
      state.userInfo = [];
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
    }
  },
  extraReducers: builder => {
    // SIGNIN
    builder.addCase(signin.pending, state => {
        state.loading = true;
    })
    builder.addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo.push(action.payload);
        state.error = null;
        localStorage.setItem('user', JSON.stringify(state.userInfo))
    })
    builder.addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    // REGISTER
    builder.addCase(register.pending, state => {
      state.loading = true;
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo.push(action.payload);
      state.error = null;
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }
});

export const {setUserFromCookie, signout} = userSlice.actions;
export default userSlice.reducer; 

