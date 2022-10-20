import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
//@ts-ignore
import styles from "./SingleProducts.module.css";
import { addCartItemAsync } from "../../redux/actionCreators/CartActions";

//types
import { ProductItem } from "../../types/ProductItem";
import { CartItem } from "../../types/CartItem";

//crashes on page reload

function SingleProducts() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.authReducer.isLogged);

  const [item, setItem] = useState<ProductItem>();
  const [itemProps, setItemProps] = useState<Omit<CartItem, "id">>();

  useEffect(() => {
    fetch(`https://panicky-swimsuit-tuna.cyclic.app/products/${id}`)
      .then((res) => res.json())
      .then((res) => setItem(res))
      .then(() => {
        const { id: _, ...rest } = item as ProductItem;
        const itemToPassAsArgument = { ...rest, quantity: 1 };
        console.log(item);

        setItemProps(itemToPassAsArgument);
      });
  }, []);

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
            onClick={() =>
              dispatch(addCartItemAsync(itemProps as Omit<CartItem, "id">))
            }
          >
            Add
          </button>
        ) : (
          <span>Чтобы добавить, залогиньтесь пожалуйста</span>
        )}
      </article>
    </div>
  );
}

export default SingleProducts;
