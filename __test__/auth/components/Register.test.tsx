import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
// States
import { AuthSlice } from "@/modules/auth/states";
// Fixtures
import { noAuthenticatedState } from "../states/authFixtures";
// Components
import { Register } from "@/modules/auth/components";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
  preloadedState: {
    auth: noAuthenticatedState,
  },
});

const mockCheckingRegisterAuth = jest.fn();
jest.mock("@/modules/auth/states/AuthThunks", () => ({
  checkingRegisterAuthentication: (
    displayName: string,
    email: string,
    password: string
  ) => {
    return () => mockCheckingRegisterAuth(displayName, email, password);
  },
}));

const displayName = "Test";
const email = "test@email.com";
const password = "12345678";

describe("Test in <Register />", () => {
  test("should render the component", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    expect(screen.getAllByText("Register"));
  });

  test("should call checkingRegisterAuthentication", async () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    const event = userEvent.setup();
    const displayNameInput = screen.getByRole("textbox", { name: "Username" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByTestId("password-input");
    const registerBtn = screen.getByLabelText("register-btn");
    await event.type(displayNameInput, displayName);
    await event.type(emailInput, email);
    await event.type(passwordInput, password);
    await event.click(registerBtn);
    expect(mockCheckingRegisterAuth).toHaveBeenCalledWith(
      displayName,
      email,
      password
    );
  });
});
