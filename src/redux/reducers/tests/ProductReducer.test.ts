//reducer
import { productReducer } from "../productsReducer";

//actions
import {
  deleteProduct,
  addProduct,
  updateProduct,
  getProducts,
  productsLoading,
} from "../../actionCreators/ProductsActions";

import { ProductItem } from "../../../types/ProductItem";

type init = {
  products: Array<ProductItem>;
  error: boolean;
  loading: boolean;
};

let state: init = {
  products: [],
  error: false,
  loading: false,
};

beforeEach(() => {
  state = {
    products: [],
    error: false,
    loading: false,
  };
});

describe("Product Reducer", () => {
  test("Gets items", () => {
    const arr: ProductItem[] = [
      {
        id: "id",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
      {
        id: "id2",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
    ];
    state = productReducer(state, getProducts(arr));
    expect(state.products.length).toBe(2);
  });

  test("Deletes items", () => {
    const arr: ProductItem[] = [
      {
        id: "id",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
      {
        id: "id2",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
    ];
    state = productReducer(state, getProducts(arr));
    state = productReducer(state, deleteProduct(arr[0].id));
    state = productReducer(state, deleteProduct(arr[1].id));
    expect(state.products.length).toBe(0);
  });

  test("Updates items", () => {
    const arr: ProductItem[] = [
      {
        id: "id",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
      {
        id: "id2",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
    ];

    state = productReducer(state, getProducts(arr));
    state = productReducer(
      state,
      updateProduct(arr[0].id, {
        id: "id",
        description: "cool laptop very cooool! blabla",
        stock: 5,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      })
    );
    expect(state.products[0]).toEqual({
      id: "id",
      description: "cool laptop very cooool! blabla",
      stock: 5,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    });
    state = productReducer(
      state,
      updateProduct(arr[1].id, {
        id: "id",
        description: "cool laptop very cooool! awgfiu",
        stock: 14,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      })
    );
    expect(state.products[1]).toEqual({
      id: "id",
      description: "cool laptop very cooool! awgfiu",
      stock: 14,
      picture: "https://dummyimage.com/500x500/000/fff.png",
      title: "laptop",
      price: 442,
    });
  });

  test("Adds products", () => {
    const arr: ProductItem[] = [
      {
        id: "id",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
      {
        id: "id2",
        description: "cool laptop very cooool!",
        stock: 2,
        picture: "https://dummyimage.com/500x500/000/fff.png",
        title: "laptop",
        price: 442,
      },
    ];
    state = productReducer(state, addProduct(arr[0]));
    expect(state.products.length).toBe(1);
  });

  test("Sets loading", () => {
    state = productReducer(state, productsLoading(true));
    expect(state.loading).toBeTruthy();
    state = productReducer(state, productsLoading(false));
    expect(state.error).toBeFalsy();
  });
});
