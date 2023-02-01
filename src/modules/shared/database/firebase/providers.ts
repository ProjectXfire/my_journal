// External libraries
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
// Firebase config
import { firebaseAuth } from "./firebase";
// Models
import { IUser } from "@/modules/auth/models";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const registerAndSignIn = async (
  displayName: string,
  email: string,
  password: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    if (!firebaseAuth.currentUser) throw new Error();
    await updateProfile(firebaseAuth.currentUser, { displayName });
    const user: IUser = {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: null,
      uid: result.user.uid,
    };
    return {
      ok: true,
      user: user,
      message: "successful",
    };
  } catch (error: any) {
    return {
      ok: false,
      user: null,
      message: "Failed register or email is already in use",
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user: IUser = {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: null,
      uid: result.user.uid,
    };
    return {
      ok: true,
      user: user,
      message: "successful",
    };
  } catch (error: any) {
    return {
      ok: false,
      user: null,
      message: error.code,
    };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    //const credentials = GoogleAuthProvider.credentialFromResult(result);
    const user: IUser = {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      uid: result.user.uid,
    };
    return {
      ok: true,
      user: user,
      message: "successful",
    };
  } catch (error: any) {
    return {
      ok: false,
      user: null,
      message: error.code,
    };
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, githubProvider);
    //const credentials = GithubAuthProvider.credentialFromResult(result);
    const user: IUser = {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      uid: result.user.uid,
    };
    return {
      ok: true,
      user: user,
      message: "successful",
    };
  } catch (error: any) {
    return {
      ok: false,
      user: null,
      message: error.code,
    };
  }
};

export const closeSession = async () => {
  try {
    await signOut(firebaseAuth);
    return {
      ok: true,
      message: "Sign-out successful",
    };
  } catch (error) {
    return {
      ok: false,
      message: "An error happened",
    };
  }
};
