import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Modal from "../Modal";
import CommonLayout from "../CommonLayout";

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
});
