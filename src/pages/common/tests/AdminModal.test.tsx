import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import CommonLayout from "../CommonLayout";

import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

let store: ReturnType<typeof configureStore>;

beforeAll(() => {
  store = configureStore({
    authReducer: {
      isLogged: true,
      isAdmin: true,
      error: false,
    },
  });
});

describe("Admin modal", () => {
  test("Opens on auth icon click", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/добавить товар/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Closes on cancel button click", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/добавить товар/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByText(/закрыть/i));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
