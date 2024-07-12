import { gql } from "graphql-request";

import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/utils/graphqlClient";

export interface User {
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
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
    const response = await client.request<AuthResponse>(query, {
      email,
      password,
    });
    return response.login;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
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
    const response = await client.request<AuthResponse>(query, {
      email,
      password,
    });
    return response.signup;
  }
);
