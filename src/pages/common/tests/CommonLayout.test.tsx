import { screen, render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";

//actions
import { authError, login } from "../../../redux/actionCreators/AuthActions";
import { addCartItem } from "../../../redux/actionCreators/CartActions";

import CommonLayout from "../CommonLayout";

import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    authReducer: {
      isLogged: true,
      isAdmin: false,
      error: false,
    },
  });
});

describe("Common Layout / Nav Bar", () => {
  test("Renders properly when not logged and not an admin", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: "MyShop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByTestId("svg")).not.toBeInTheDocument();
  });

  test("Renders properly when logged and not an admin", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: "MyShop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByTestId("svg")).not.toBeInTheDocument();
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
    expect(screen.getByText(/выйти/i)).toBeInTheDocument();

    const amount = screen.getByTestId("cart-info").textContent as string;
    const matchArray = amount.match(/\d+/gi) as RegExpMatchArray;

    expect(matchArray?.length).toBe(2);
    for (let i = 0; i < matchArray.length; i++) {
      expect(Number(matchArray[i])).toBe(0);
    }
  });

  test("Renders cart info properly when logged and not an admin", () => {
    store.dispatch(
      addCartItem({
        id: "29qijof",
        title: "Test Title",
        picture: "test",
        quantity: 1,
        price: 87.79,
        description: "Test Description",
        stock: 13,
      })
    );

    store.dispatch(
      addCartItem({
        id: "29qijofawf2",
        title: "Test Title",
        picture: "test",
        quantity: 2,
        price: 131.21,
        description: "Test Description",
        stock: 13,
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );

    const amount = screen.getByTestId("cart-info").textContent as string;
    const matchArray = amount.match(/\d+/gi) as RegExpMatchArray;

    expect(+matchArray[0]).toBe(2);
    expect(+matchArray[1]).toBe(350);
  });
});
