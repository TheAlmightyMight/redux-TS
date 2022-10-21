import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

//components
import SingleProducts from "../SingleProducts";

//actions
import { login } from "../../../redux/actionCreators/AuthActions";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

import { Routes, BrowserRouter, Route } from "react-router-dom";

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

describe("Single Product Page", () => {
  test("Renders when not logged and not an admin", () => {
    render(
      <Provider store={store}>
        <SingleProducts />
      </Provider>
    );

    expect(screen.getByTestId("par")).toHaveTextContent(
      "Вы не можете добавлять товар в корзину"
    );
  });

  // test("Renders when logged and not an admin", () => {
  //   store.dispatch(login(false));
  //   render(
  //     <Provider store={store}>
  //       <SingleProducts />
  //     </Provider>
  //   );

  //   screen.debug();

  //   expect(screen.getByText("Добавить")).toBeInTheDocument();
  // });
});
