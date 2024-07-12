import { fetchPokemon, Pokemon } from "@/services/pokemonService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemon: null,
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemon.fulfilled,
        (state, action: PayloadAction<Pokemon>) => {
          state.loading = false;
          state.pokemon = action.payload;
        }
      )
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch failed";
      });
  },
});

export default pokemonSlice.reducer;
