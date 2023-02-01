// External libraries
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// States
import { AuthSlice } from "@/modules/auth/states";
import { JournalSlice } from "@/modules/journal/states";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    journal: JournalSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
