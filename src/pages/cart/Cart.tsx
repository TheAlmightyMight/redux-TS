import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
//@ts-ignore
import styles from "./Cart.module.css";
import {
  getCartItemsAsync,
  deleteCartItemsAllAsync,
} from "../../redux/actionCreators/CartActions";

import TableRow from "./TableRow";

//types
import { CartItem } from "../../types/CartItem";

function Cart() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartItemsAsync());
  }, []);

  const items = useAppSelector((state) => state.cartReducer.items);
  const loading = useAppSelector((state) => state.cartReducer.loading);
  return (
    <div className={styles.container}>
      <table align="center" cellPadding={"10px"}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price for one</th>
            <th>Amount</th>
            <th>Price for all</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            items.map((el: CartItem) => {
              return <TableRow {...el} key={el.id} />;
            })
          )}
          <tr>
            <td colSpan={6}>
              <button onClick={() => dispatch(deleteCartItemsAllAsync())}>
                Удалить все
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
