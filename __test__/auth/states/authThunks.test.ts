import { demoUser } from "./authFixtures";
// Thunks
import {
  checkingAuthentication,
  checkingRegisterAuthentication,
  closingSession,
} from "@/modules/auth/states/AuthThunks";
import {
  closeSession,
  registerAndSignIn,
  signIn,
} from "@/modules/shared/database/firebase/providers";
// Slice
import {
  checkingCredentials,
  login,
  logout,
  setError,
} from "@/modules/auth/states";
// Firebase providers
jest.mock("@/modules/shared/database/firebase/providers");

describe("Test in AuthThunks", () => {
  const displayName = "Test";
  const email = "test@email.com";
  const password = "12345678";
  const dispatch = jest.fn();
  const mockedSignIn = jest.mocked(signIn);
  const mockedRegisterAndSignIn = jest.mocked(registerAndSignIn);
  const mockedCloseSession = jest.mocked(closeSession);
  beforeEach(() => jest.clearAllMocks());

  //--> checkingAuthentication
  test("checkingAuthentication: should call checkingCredentials and login", async () => {
    const result = { ok: true, user: demoUser, message: "" };
    mockedSignIn.mockResolvedValue(result);
    await checkingAuthentication(email, password)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });
  test("checkingAuthentication: should call checkingCredentials and setError", async () => {
    const result = { ok: false, user: null, message: "Error message" };
    mockedSignIn.mockResolvedValue(result);
    await checkingAuthentication(email, password)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(setError(result.message));
  });

  //--> registerAndSignIn
  test("checkingRegisterAuthentication: should call checkingCredentials and login", async () => {
    const result = { ok: true, user: demoUser, message: "successful" };
    mockedRegisterAndSignIn.mockResolvedValue(result);
    await checkingRegisterAuthentication(
      displayName,
      email,
      password
    )(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });
  test("checkingRegisterAuthentication: should call checkingCredentials and setError", async () => {
    const result = {
      ok: false,
      user: null,
      message: "error",
    };
    mockedRegisterAndSignIn.mockResolvedValue(result);
    await checkingRegisterAuthentication(
      displayName,
      email,
      password
    )(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(setError(result.message));
  });

  //--> closingSession
  test("closingSession: should call logout", async () => {
    const result = { ok: true, message: "Sign-out successful" };
    mockedCloseSession.mockResolvedValue(result);
    await closingSession()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
  test("closingSession: should call setError", async () => {
    const result = { ok: false, message: "An error happened" };
    mockedCloseSession.mockResolvedValue(result);
    await closingSession()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(setError(result.message));
  });
});
