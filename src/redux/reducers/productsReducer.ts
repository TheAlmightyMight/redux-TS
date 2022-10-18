import { ProductItem } from "../../types/ProductItem";
import { ActionTypes, ProductAction } from "../actionCreators/ProductsActions";

type InitialState = {
  products: Array<ProductItem>;
  error: boolean;
  loading: boolean;
};

const initialState = {
  products: [] as ProductItem[],
  error: false,
  loading: false,
};

export const productReducer = (
  state: InitialState = initialState,
  action: ProductAction
): typeof initialState => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter((el) => el.id !== action.payload),
      };
    }
    case ActionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: action.payload.length === 0 ? true : false,
      };
    case ActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((el) => {
          if (el.id === action.payload.id) {
            return { ...action.payload.data };
          }
          return el;
        }),
      };
    case ActionTypes.PRODUCTS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};
