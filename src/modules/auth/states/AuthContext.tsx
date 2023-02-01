import { createContext, ReactNode, useEffect, useState } from "react";
// External libraries
import { onAuthStateChanged, User } from "firebase/auth";
// Firebase config
import { firebaseAuth } from "@/modules/shared/database";
import { useAppDispatch } from "@/modules/shared/store";
import { login, logout } from "./AuthSlice";
import { IUser } from "../models";

export interface AuthState {
  verifyUser: User | null;
}

interface AuthObservableContextProps {
  state: AuthState;
}

export const AuthObservableContext = createContext(
  {} as AuthObservableContextProps
);

export const AuthObservableProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state] = useState<AuthState>({ verifyUser: null });
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const setUser: IUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        dispatch(login(setUser));
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthObservableContext.Provider value={{ state }}>
      {children}
    </AuthObservableContext.Provider>
  );
};
