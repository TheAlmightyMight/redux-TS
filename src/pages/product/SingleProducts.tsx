import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
//@ts-ignore
import styles from "./SingleProducts.module.css";
import { addCartItemAsync } from "../../redux/actionCreators/CartActions";

//types
import { ProductItem } from "../../types/ProductItem";
import { CartItem } from "../../types/CartItem";

//crashes on interaction

function SingleProducts() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.authReducer.isLogged);
  const admin = useAppSelector((state) => state.authReducer.isAdmin);
  const inCart = useAppSelector((state) => state.cartReducer.items);

  const [item, setItem] = useState<ProductItem>();

  useEffect(() => {
    fetch(`https://panicky-swimsuit-tuna.cyclic.app/products/${id}`)
      .then((res) => res.json())
      .then((res) => setItem(res));
  }, [id]);

  const clickHandler = (
    args: ProductItem
  ): { quantity: number } & Omit<CartItem, "id"> => {
    const { id, ...rest } = args;
    return { ...rest, quantity: 1 };
  };

  return (
    <div className={styles.container}>
      <article className={styles.innerContainer}>
        <h3 style={{ margin: "0", padding: "0" }}>{item?.title}</h3>
        <figure className={styles.imgContainer}>
          <img
            className={styles.image}
            alt={`Товар ${item?.id} картинка отвалилась`}
            src={item?.picture}
          />
          <figcaption>Описание:{item?.description}</figcaption>
        </figure>
        {logged || admin ? (
          inCart ? (
            <p>Товар в корзине</p>
          ) : (
            <button
              style={{
                width: "150px",
                height: "50px",
                background: "green",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
              }}
              onClick={() =>
                dispatch(addCartItemAsync(clickHandler(item as ProductItem)))
              }
            >
              Добавить
            </button>
          )
        ) : (
          <p data-testid="par">Вы не можете добавлять товар в корзину</p>
        )}
      </article>
    </div>
  );
}

export default SingleProducts;
