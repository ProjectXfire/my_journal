import { IUser } from "@/modules/auth/models";
import { IState } from "@/modules/auth/states";
import { User } from "firebase/auth";

// Demo data

export const demoUser: IUser = {
  displayName: "Test",
  email: "test@email.com",
  photoURL: "url",
  uid: "testUID",
};

// States

export const initState: IState = {
  status: "checking",
  user: null,
  errorMessage: null,
};

export const authenticatedState: IState = {
  status: "authenticated",
  user: demoUser,
  errorMessage: null,
};

export const noAuthenticatedState: IState = {
  status: "not-authenticated",
  user: null,
  errorMessage: null,
};

export const errorOnAuthentication: IState = {
  status: "not-authenticated",
  user: null,
  errorMessage: "Error on logout",
};
