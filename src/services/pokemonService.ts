import { gql } from "graphql-request";
import client from "../utils/graphqlClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  types: string[];
}

interface PokemonResponse {
  pokemon: Pokemon;
}

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (name: string) => {
    const query = gql`
      query getPokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          image
          types
        }
      }
    `;
    const response = await client.request<PokemonResponse>(query, { name });
    return response.pokemon;
  }
);
