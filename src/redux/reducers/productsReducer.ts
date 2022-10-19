import { ProductItem } from "../../types/ProductItem";
import {
  ProductActionTypes,
  ProductAction,
} from "../actionCreators/ProductsActions";

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
    case ProductActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ProductActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter((el) => el.id !== action.payload),
      };
    }
    case ProductActionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: action.payload.length === 0 ? true : false,
      };
    case ProductActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((el) => {
          if (el.id === action.payload.id) {
            return { ...action.payload.data };
          }
          return el;
        }),
      };
    case ProductActionTypes.PRODUCTS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};
