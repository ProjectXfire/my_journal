// External libraries
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Models
import { IUser } from "../models";

export interface IState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: null | IUser;
  errorMessage: null | string;
}

const initialState: IState = {
  status: "checking",
  user: null,
  errorMessage: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: IState, action: PayloadAction<IUser>) => {
      state.status = "authenticated";
      state.user = action.payload;
    },
    logout: (state: IState) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = null;
    },
    checkingCredentials: (state: IState) => {
      state.errorMessage = null;
      state.status = "checking";
    },
    setError: (state: IState, action: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.errorMessage = action.payload;
    },
    clearError: (state: IState) => {
      state.errorMessage = null;
    },
  },
});

export const { login, logout, checkingCredentials, setError, clearError } =
  AuthSlice.actions;
