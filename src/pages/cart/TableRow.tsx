import React from "react";
import { useAppDispatch } from "../../types/redux-hooks";
import {
  updateCartItemAsync,
  deleteCartItemAsync,
  //@ts-ignore
} from "../../redux/actionCreators/CartActions.ts";

import { CartItem } from "../../types/CartItem";

function TableRow(props: CartItem) {
  const { id, title, price, quantity } = props;
  const dispatch = useAppDispatch();
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{price}</td>
      <td style={{ textAlign: "center" }}>
        <p data-testid="quantity">{quantity}</p>
        <button
          onClick={() =>
            dispatch(
              updateCartItemAsync(
                { ...props, quantity: props.quantity + 1 },
                "+"
              )
            )
          }
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch(
              updateCartItemAsync(
                { ...props, quantity: props.quantity - 1 },
                "-"
              )
            )
          }
        >
          -
        </button>
      </td>
      <td>{price * quantity}</td>
      <td>
        <button onClick={() => dispatch(deleteCartItemAsync(id))}>
          Убрать
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
