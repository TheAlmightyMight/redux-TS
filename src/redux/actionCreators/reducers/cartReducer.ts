import { CartAction, ActionTypes } from "../CartActions";
import { CartItem } from "../../../types/CartItem";

type InitialState = {
  items: CartItem[];
  loading: boolean;
  error: boolean;
};

const initialState = {
  items: [] as CartItem[],
  loading: false,
  error: false,
};

export const cartReducer = (
  state: InitialState = initialState,
  action: CartAction
): typeof initialState => {
  switch (action.type) {
    case ActionTypes.ADD_CART_ITEM: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case ActionTypes.DELETE_CART_ITEM: {
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    }

    case ActionTypes.DELETE_CART_ITEMS_ALL: {
      return {
        ...state,
        items: [],
      };
    }

    case ActionTypes.INCREASE_CART_ITEM_AMOUNT: {
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.id === action.payload) {
            return { ...el, quantity: el.quantity + 1 };
          }
          return el;
        }),
      };
    }

    case ActionTypes.DECREASE_CART_ITEM_AMOUNT: {
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.id === action.payload) {
            return { ...el, quantity: el.quantity - 1 };
          }
          return el;
        }),
      };
    }

    case ActionTypes.GET_CART_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }

    case ActionTypes.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
};
