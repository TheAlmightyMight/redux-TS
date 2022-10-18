import React from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
//@ts-ignore
import styles from "./SingleProducts.module.css";
import { addCartItemAsync } from "../../redux/actionCreators/CartActions";

//types
import { ProductItem } from "../../types/ProductItem";

//TODO:
// make so that if the item is already in the cart the user knows it

function SingleProducts() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.productReducer.products.find((el: ProductItem) => el.id === id)
  ) as ProductItem;
  const logged = useAppSelector((state) => state.authReducer.isLogged);
  const { id: _, ...rest } = item;
  const itemToPassAsArgument = { ...rest, quantity: 1 };
  return (
    <div className={styles.container}>
      <article className={styles.img}>
        <h3>{item.title}</h3>
        <figure>
          <img
            alt={`Товар ${item.id} картинка отвалилась`}
            src={item.picture}
          />
          <figcaption>Описание:{item.description}</figcaption>
        </figure>
        {logged ? (
          <button
            style={{
              width: "150px",
              height: "50px",
              background: "green",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
            }}
            onClick={() => dispatch(addCartItemAsync(itemToPassAsArgument))}
          >
            Add
          </button>
        ) : (
          <span>Залогиньтесь</span>
        )}
      </article>
    </div>
  );
}

export default SingleProducts;
