import { AuthSlice, login, logout, setError } from "@/modules/auth/states";
import {
  authenticatedState,
  demoUser,
  errorOnAuthentication,
  initState,
  noAuthenticatedState,
} from "./authFixtures";

describe("Test in authSlice", () => {
  test("should return the init state and called 'auth'", () => {
    const state = AuthSlice.reducer(initState, {} as any);
    expect(AuthSlice.name).toBe("auth");
    expect(state).toEqual(initState);
  });
  test("should be authenticated", () => {
    const state = AuthSlice.reducer(initState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });
  test("should be no authenticated", () => {
    const state = AuthSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(noAuthenticatedState);
  });
  test("should be no authenticated and show error message", () => {
    const state = AuthSlice.reducer(initState, setError("Error on logout"));
    expect(state).toEqual(errorOnAuthentication);
  });
});
