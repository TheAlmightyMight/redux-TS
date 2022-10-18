import { CartItem } from "../../types/CartItem";
import { Dispatch } from "react";
import { RootState } from "../store";

export type CartActionType =
  | ReturnType<typeof cartItemsLoading>
  | ReturnType<typeof cartItemsError>
  | ReturnType<typeof getCartItems>
  | ReturnType<typeof deleteCartItemsAll>
  | ReturnType<typeof deleteCartItem>
  | ReturnType<typeof addCartItem>
  | ReturnType<typeof decreaseCartItemAmount>
  | ReturnType<typeof increaseCartItemAmount>;

type Options<T extends Request> = {
  [P in keyof T]: P extends "body" ? string : T[P];
};

type RequestOptions = Partial<Options<Request>>;

const getCartItemsAsync = () => (dispatch: Dispatch<CartActionType>) => {
  dispatch(cartItemsLoading(true));
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "sdVP1i2MoACkV6vm0cuF");
  myHeaders.append("Content-Type", "application/json");
  fetch(`https://dirndl-fish.cyclic.app/cart`, {
    method: "GET",
    headers: myHeaders,
  }).then((req) => {
    if (!req.ok) {
      dispatch(cartItemsError());
    } else {
      req.json().then((res) => {
        dispatch(getCartItems(res));
        dispatch(cartItemsLoading(false));
      });
    }
  });
};

const deleteCartItemAsync =
  (id: string) => (dispatch: Dispatch<CartActionType>) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "sdVP1i2MoACkV6vm0cuF");

    const requestOptions: RequestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://dirndl-fish.cyclic.app/cart/sdVP1i2MoACkV6vm0cuF/${id}`,
      requestOptions
    ).then((req) => {
      if (!req.ok) {
        dispatch(cartItemsError());
      } else {
        dispatch(deleteCartItem(id));
      }
    });
  };

const deleteCartItemsAllAsync = () => (dispatch: Dispatch<CartActionType>) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "sdVP1i2MoACkV6vm0cuF");
  myHeaders.append("Content-Type", "application/json");

  const options: RequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  fetch(`https://dirndl-fish.cyclic.app/cart/all`, options).then((req) => {
    if (!req.ok) {
      dispatch(cartItemsError());
    } else {
      dispatch(deleteCartItemsAll());
    }
  });
};

const addCartItemAsync =
  (data: Omit<CartItem, "id">) =>
  (dispatch: Dispatch<CartActionType>, getState: () => RootState) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "sdVP1i2MoACkV6vm0cuF");
    myHeaders.append("Content-Type", "application/json");

    const options: RequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    fetch(`https://dirndl-fish.cyclic.app/cart`, options).then((req) => {
      if (!req.ok) {
        dispatch(cartItemsError());
      } else {
        // /? fix the absence of id
        dispatch(addCartItem(data as CartItem));
      }
    });
  };

const updateCartItemAsync =
  (data: CartItem, operation: "+" | "-") =>
  (dispatch: Dispatch<CartActionType>) => {
    if (data.quantity < 1) return;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "sdVP1i2MoACkV6vm0cuF");
    myHeaders.append("Content-Type", "application/json");

    const options: RequestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    fetch(
      `https://dirndl-fish.cyclic.app/cart/sdVP1i2MoACkV6vm0cuF/${data.id}`,
      options
    ).then((req) => {
      if (!req.ok) {
        dispatch(cartItemsError());
      } else {
        (operation === "+" && dispatch(increaseCartItemAmount(data.id))) ||
          (operation === "-" && dispatch(decreaseCartItemAmount(data.id))) ||
          console.log("wrong operation");
      }
    });
  };

enum ActionTypes {
  "GET_CART_ITEMS",
  "ADD_CART_ITEM",
  "DELETE_CART_ITEM",
  "DELETE_CART_ITEMS_ALL",
  "INCREASE_CART_ITEM_AMOUNT",
  "DECREASE_CART_ITEM_AMOUNT",
  "CART_ERROR",
  "LOADING",
}

interface CartItemsErrorAction {
  type: ActionTypes.CART_ERROR;
}

function cartItemsError(): CartItemsErrorAction {
  return {
    type: ActionTypes.CART_ERROR,
  };
}

interface CartItemsLoadingAction {
  type: ActionTypes.LOADING;
  payload: boolean;
}

function cartItemsLoading(flag: boolean): CartItemsLoadingAction {
  return {
    type: ActionTypes.LOADING,
    payload: flag,
  };
}

interface GetCartItemsAction {
  type: ActionTypes.GET_CART_ITEMS;
  payload: CartItem[];
}

function getCartItems(items: Array<CartItem>): GetCartItemsAction {
  return {
    type: ActionTypes.GET_CART_ITEMS,
    payload: items,
  };
}

interface DeleteCartItemsAllAction {
  type: ActionTypes.DELETE_CART_ITEMS_ALL;
}

function deleteCartItemsAll(): DeleteCartItemsAllAction {
  return {
    type: ActionTypes.DELETE_CART_ITEMS_ALL,
  };
}

interface DeleteCartItemAction {
  type: ActionTypes.DELETE_CART_ITEM;
  payload: string;
}

function deleteCartItem(id: string): DeleteCartItemAction {
  return {
    type: ActionTypes.DELETE_CART_ITEM,
    payload: id,
  };
}

interface AddCartItemAction {
  type: ActionTypes.ADD_CART_ITEM;
  payload: CartItem;
}

function addCartItem(elem: CartItem): AddCartItemAction {
  return {
    type: ActionTypes.ADD_CART_ITEM,
    payload: elem,
  };
}

interface IncreaseCartItemAmountAction {
  type: ActionTypes.INCREASE_CART_ITEM_AMOUNT;
  payload: string;
}

function increaseCartItemAmount(id: string): IncreaseCartItemAmountAction {
  return {
    type: ActionTypes.INCREASE_CART_ITEM_AMOUNT,
    payload: id,
  };
}

interface DecreaseCartItemAmountAction {
  type: ActionTypes.DECREASE_CART_ITEM_AMOUNT;
  payload: string;
}

function decreaseCartItemAmount(id: string): DecreaseCartItemAmountAction {
  return {
    type: ActionTypes.DECREASE_CART_ITEM_AMOUNT,
    payload: id,
  };
}

type CartAction =
  | ReturnType<typeof increaseCartItemAmount>
  | ReturnType<typeof decreaseCartItemAmount>
  | ReturnType<typeof addCartItem>
  | ReturnType<typeof deleteCartItem>
  | ReturnType<typeof deleteCartItemsAll>
  | ReturnType<typeof cartItemsError>
  | ReturnType<typeof cartItemsLoading>
  | ReturnType<typeof getCartItems>;

export {
  getCartItemsAsync,
  deleteCartItemAsync,
  addCartItemAsync,
  updateCartItemAsync,
  deleteCartItemsAllAsync,
  ActionTypes,
};
export type { CartAction };
