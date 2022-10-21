/* eslint-disable */
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

//actions
import {
  increaseCartItemAmount,
  decreaseCartItemAmount,
  cartItemsLoading,
  deleteCartItem,
} from "../../../redux/actionCreators/CartActions";

//components

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

//components
import TableRow from "../TableRow";
import Cart from "../Cart";
import { act } from "react-dom/test-utils";

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

describe("Cart Table Row", () => {
  test("Renders as intended", () => {
    const props = {
      id: "YGBj5fBs8b61PdjpfKLs",
      quantity: 1,
      description: "cool laptop very cooool!",
      stock: 2,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    };

    render(
      <Provider store={store}>
        <TableRow {...props} />
      </Provider>
    );
  });

  test("Increments quantity", async () => {
    store.dispatch(increaseCartItemAmount("id"));
    render(
      <Provider store={store}>
        <Cart shouldRunUseEffectOnLoad={false} />
      </Provider>
    );

    act(() => {
      screen.getAllByTestId("quantity").forEach((el, i) => {
        store.dispatch(increaseCartItemAmount(el.id));
      });
    });

    const array = screen.getAllByTestId("quantity");
    expect(Number(array[0].textContent)).toBe(3);
  });

  test("Decrements quantity", async () => {
    store.dispatch(decreaseCartItemAmount("id"));
    render(
      <Provider store={store}>
        <Cart shouldRunUseEffectOnLoad={false} />
      </Provider>
    );

    const array = screen.getAllByTestId("quantity");
    expect(Number(array[0].textContent)).toBe(1);
  });

  test("Deletes items", async () => {
    store.dispatch(deleteCartItem("id"));
    render(
      <Provider store={store}>
        <Cart shouldRunUseEffectOnLoad={false} />
      </Provider>
    );

    const array = screen.queryAllByTestId("item");
    expect(array.length).toBe(0);
  });
});
