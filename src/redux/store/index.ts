import authSlice from "@/reducers/auth.slice";
import pokemonSlice from "@/reducers/pokemon.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    pokemon: pokemonSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
