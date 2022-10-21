import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Cart from ".././Cart";

import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

//types
import { CartItem } from "../../../types/CartItem";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    cartReducer: {
      items: [
        {
          id: "id",
          quantity: 2,
          description: "cool laptop very cooool!",
          stock: 2,
          picture: "https://dummyimage.com/500x500/000/fff.png",
          title: "laptop",
          price: 442,
        },
      ],
      loading: false,
      error: false,
    },
  });
});

describe("Cart Page", () => {
  test.skip("Renders an empty list after pressing delete all button", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    const element = screen.getByText("Удалить все");
    const list = screen.queryAllByRole("listitem");
    userEvent.click(element);
    expect(list.length).toBe(0);
  });

  test("Renders a list of cart items", () => {
    const itemsLength = store.getState().cartReducer.items.length;

    render(
      <Provider store={store}>
        <Cart shouldRunUseEffectOnLoad={false} />
      </Provider>
    );

    const items = screen.getAllByTestId("item");
    expect(items.length).toBe(itemsLength);
  });
});
