import "@testing-library/jest-dom";

//reducer
import { cartReducer } from "../cartReducer";

//actions
import {
  addCartItem,
  deleteCartItem,
  deleteCartItemsAll,
  increaseCartItemAmount,
  decreaseCartItemAmount,
  cartItemsLoading,
  getCartItems,
} from "../../actionCreators/CartActions";

import { CartItem } from "../../../types/CartItem";

type stateInit = {
  items: CartItem[];
  loading: boolean;
  error: boolean;
};

let state: stateInit = {
  items: [],
  loading: false,
  error: false,
};

beforeEach(() => {
  state = {
    items: [],
    loading: false,
    error: false,
  };
});

describe("Cart Reducer", () => {
  test("Adds an item", () => {
    const obj: CartItem = {
      id: "id",
      quantity: 2,
      description: "cool laptop very cooool!",
      stock: 2,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    };
    expect(cartReducer(state, addCartItem(obj)).items.length).toBeGreaterThan(
      0
    );
    console.log(state);
  });

  test("Adds and deletes an item", () => {
    const obj: CartItem = {
      id: "id",
      quantity: 2,
      description: "cool laptop very cooool!",
      stock: 2,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    };
    expect(cartReducer(state, addCartItem(obj)).items.length).toBe(1);
    expect(cartReducer(state, deleteCartItem(obj.id)).items.length).toBe(0);
  });

  test("Deletes all items", () => {
    const obj: CartItem = {
      id: "id",
      quantity: 2,
      description: "cool laptop very cooool!",
      stock: 2,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    };
    const obj2: CartItem = {
      id: "id2",
      quantity: 1,
      description: "cool laptop very cooool!",
      stock: 2,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 25,
    };
    state = cartReducer(state, addCartItem(obj));
    state = cartReducer(state, addCartItem(obj2));
    expect(state.items.length).toBe(2);
    expect(cartReducer(state, deleteCartItemsAll()).items.length).toBe(0);
  });

  test("Increments and decrements", () => {
    const obj: CartItem = {
      id: "id",
      quantity: 2,
      description: "cool laptop very cooool!",
      stock: 2,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    };
    state = cartReducer(state, addCartItem(obj));
    state = cartReducer(state, increaseCartItemAmount(obj.id));
    expect(state.items[0].quantity).toBe(3);
    state = cartReducer(state, decreaseCartItemAmount(obj.id));
    expect(state.items[0].quantity).toBe(2);
  });

  test("Gets cart items", () => {
    const arr: CartItem[] = [
      {
        id: "id",
        quantity: 2,
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
      {
        id: "id2",
        quantity: 1,
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 25,
      },
    ];

    state = cartReducer(state, getCartItems(arr));
    expect(state.items.length).toBe(2);
  });

  test("Sets loading state", () => {
    state = cartReducer(state, cartItemsLoading(true));
    expect(state.loading).toBeTruthy();
    state = cartReducer(state, cartItemsLoading(false));
    expect(state.loading).toBeFalsy();
  });
});
