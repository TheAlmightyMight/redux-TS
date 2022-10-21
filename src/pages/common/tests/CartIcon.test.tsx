import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

//auth action creators
import { login, logout } from "../../../redux/actionCreators/AuthActions";

import CommonLayout from "../CommonLayout";

import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

let store: ReturnType<typeof configureStore>;

beforeAll(() => {
  store = configureStore({
    authReducer: {
      isLogged: false,
      isAdmin: false,
      error: false,
    },
  });
});

describe("Cart Icon", () => {
  test("Gets displayed when logged but not an admin", async () => {
    store.dispatch(login(false));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );
    //@ts-ignore
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
  });

  test("Does not get displayed when logged and an admin", async () => {
    store.dispatch(login(true));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );
    //@ts-ignore
    expect(screen.queryByTestId("cart-icon")).not.toBeInTheDocument();
  });
});
