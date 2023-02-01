import { useEffect } from "react";
// Externa libraries
import { useSelector } from "react-redux";
// States
import { RootState, useAppDispatch } from "@/modules/shared/store";
import {
  checkingRegisterAuthentication,
  checkingAuthentication,
  checkingGithubAuthentication,
  checkingGoogleAuthentication,
} from "../states/AuthThunks";
import { clearError } from "../states";

export const useAuth = () => {
  //--> Hooks

  const dispatch = useAppDispatch();
  const { errorMessage, status } = useSelector(
    (state: RootState) => state.auth
  );

  //--> Methods

  const onSubmit = (email: string, password: string) => {
    dispatch(checkingAuthentication(email, password));
  };

  const startGoogleSignIn = () => {
    dispatch(checkingGoogleAuthentication());
  };

  const startGitHubSignIn = () => {
    dispatch(checkingGithubAuthentication());
  };

  const startRegister = (
    displayName: string,
    email: string,
    password: string
  ) => {
    dispatch(checkingRegisterAuthentication(displayName, email, password));
  };

  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--> Return properties or methods

  return {
    errorMessage,
    status,
    onSubmit,
    startGoogleSignIn,
    startGitHubSignIn,
    startRegister,
  };
};
