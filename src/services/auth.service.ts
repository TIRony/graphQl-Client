import { gql } from "graphql-request";

import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/utils/graphqlClient";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  login: {
    token: string;
    user: User;
  };
  createUser: {
    // Adjust to match your mutation name
    token: string;
    user: User;
  };
}

export const login = createAsyncThunk(
  "api/login",
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
  "api/register",
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const query = gql`
      mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
          token
          user {
            id
            email
            name
          }
        }
      }
    `;

    const response = await client.request<AuthResponse>(query, {
      name,
      email,
      password,
    });

    console.log("Signup response:", response); // Check the response structure
    return response.createUser; // Adjust this to match the response structure
  }
);
