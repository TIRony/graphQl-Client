import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../utils/graphqlClient';
import { gql } from 'graphql-request';

interface User {
  id: string;
  email: string;
}

interface AuthResponse {
  login: {
    token: string;
    user: User;
  };
  signup: {
    token: string;
    user: User;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string, password: string }) => {
  const query = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `;
  const response = await client.request<AuthResponse>(query, { email, password });
  return response.login;
});

export const signup = createAsyncThunk('auth/signup', async ({ email, password }: { email: string, password: string }) => {
  const query = gql`
    mutation Signup($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `;
  const response = await client.request<AuthResponse>(query, { email, password });
  return response.signup;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
