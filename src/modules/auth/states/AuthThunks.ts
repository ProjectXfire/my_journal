import { AppDispatch } from "@/modules/shared/store";
import { checkingCredentials, login, logout, setError } from "./AuthSlice";
import {
  registerAndSignIn,
  signIn,
  signInWithGithub,
  signInWithGoogle,
  closeSession,
} from "@/modules/shared/database/firebase/providers";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await signIn(email, password);
    if (result.ok) {
      dispatch(login(result.user!));
    } else {
      dispatch(setError(result.message));
    }
  };
};

export const checkingRegisterAuthentication = (
  displayName: string,
  email: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await registerAndSignIn(displayName, email, password);
    if (result.ok) {
      dispatch(login(result.user!));
    } else {
      dispatch(setError(result.message));
    }
  };
};

export const checkingGoogleAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (result.ok) {
      dispatch(login(result.user!));
    } else {
      dispatch(setError(result.message));
    }
  };
};

export const checkingGithubAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGithub();
    if (result.ok) {
      dispatch(login(result.user!));
    } else {
      dispatch(setError(result.message));
    }
  };
};

export const closingSession = () => {
  return async (dispatch: AppDispatch) => {
    const result = await closeSession();
    if (result.ok) {
      dispatch(logout());
    } else {
      dispatch(setError(result.message));
    }
  };
};
