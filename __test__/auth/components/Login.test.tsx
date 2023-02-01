import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
// Components
import { Login } from "@/modules/auth/components";
// States
import { AuthSlice } from "@/modules/auth/states";
// Fixtures
import { noAuthenticatedState } from "../states/authFixtures";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
  preloadedState: {
    auth: noAuthenticatedState,
  },
});

const mockCheckingAuth = jest.fn();
const mockCheckingGoogleAuth = jest.fn();
const mockCheckingGithubAuth = jest.fn();
jest.mock("@/modules/auth/states/AuthThunks", () => ({
  checkingAuthentication: (email: string, password: string) => {
    return () => mockCheckingAuth(email, password);
  },
  checkingGoogleAuthentication: () => mockCheckingGoogleAuth,
  checkingGithubAuthentication: () => mockCheckingGithubAuth,
}));

describe("Test in <Login />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Should render the component", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getAllByText("Sign in"));
  });

  test("should call checkingAuthentication on normal sign in", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const event = userEvent.setup();
    const email = "test@email.com";
    const password = "12345678";
    // Html elements
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByTestId("password-input");
    const signinBtn = screen.getByLabelText("signin-btn");
    // Actions
    await event.type(emailInput, email);
    await event.type(passwordInput, password);
    await event.click(signinBtn);
    // Expects
    expect(mockCheckingAuth).toHaveBeenCalledWith(email, password);
  });

  test("should call checkingGoogleAuthentication on google sign in", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);
    expect(mockCheckingGoogleAuth).toHaveBeenCalled();
  });

  test("should call checkingGithubAuthentication on github sign in", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const githubBtn = screen.getByLabelText("github-btn");
    fireEvent.click(githubBtn);
    expect(mockCheckingGithubAuth).toHaveBeenCalled();
  });
});
