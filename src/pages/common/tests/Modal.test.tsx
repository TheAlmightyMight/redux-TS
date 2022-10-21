import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

//actions
import { authError } from "../../../redux/actionCreators/AuthActions";

import CommonLayout from "../CommonLayout";
import Modal from "../Modal";

import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    authReducer: {
      isLogged: false,
      isAdmin: false,
      error: false,
    },
  });
});

describe("Auth modal", () => {
  test("Opens when the state is toggled", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    const icon = screen.getByTestId("svg");
    expect(icon).toBeInTheDocument();
    fireEvent.click(icon);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Closes when the state is toggled", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    const icon = screen.getByTestId("svg");
    fireEvent.click(icon);
    fireEvent.click(screen.getByText("X"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("Closes when the after cancel button is pressed", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    const icon = screen.getByTestId("svg");
    fireEvent.click(icon);
    fireEvent.click(screen.getByText(/отмена/i));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("Displays error, if provided credentials are invalid", () => {
    store.dispatch(authError(true));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Modal setShowAuthModal={() => void 0} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Такого пользователя нет")).toBeInTheDocument();
    expect(screen.getByText("Попробовать заново")).toBeInTheDocument();
  });

  test("Displays form, if provided credentials are valid", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Modal setShowAuthModal={() => void 0} />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.queryByText("Такого пользователя нет")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Попробовать заново")).not.toBeInTheDocument();
  });
});
