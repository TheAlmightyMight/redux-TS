import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

//actions
import { login, logout } from "../../../redux/actionCreators/AuthActions";
import { addCartItem } from "../../../redux/actionCreators/CartActions";

import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

//components
import Product from "../Product";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    authReducer: {
      isLogged: false,
      isAdmin: false,
      error: false,
    },
    cartReducer: {
      items: [],
      loading: false,
      error: false,
    },
  });
});

describe("Product Page", () => {
  const product = {
    id: "id",
    description: "cool laptop very cooool!",
    stock: 2,
    picture: "https://dummyimage.com/500x500/000/fff.png",
    title: "laptop",
    price: 442,
  };
  test("Renders properly when not logged in", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Product {...product} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Чтобы добавить залогиньтесь")).toBeInTheDocument();
  });

  test("Renders properly when cart does not contain item", () => {
    store.dispatch(login(false));
    store.dispatch(
      addCartItem({
        id: "id",
        quantity: 1,
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      })
    );
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Product {...product} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Товар уже в корзине")).toBeInTheDocument();
  });
});
