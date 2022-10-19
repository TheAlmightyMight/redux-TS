import { combineReducers } from "redux";
import { authReducer } from "./actionCreators/reducers/authReducer";
import { productReducer } from "./actionCreators/reducers/productsReducer";
import { cartReducer } from "./actionCreators/reducers/cartReducer";

export const rootReducer = combineReducers({
  productReducer,
  authReducer,
  cartReducer,
});
