import { configureStore } from "@reduxjs/toolkit";
import animeSlice from "./features/animeSlice";
// import userSlice from "./features/userSlice";
// import { userSlice } from "./features/userSlice";

// The Redux store is a single source of truth for the state of your entire application. It holds the complete state tree of your application.

export const store = configureStore({
  reducer: {
    anime: animeSlice,
    // user: userSlice,
  },
});
