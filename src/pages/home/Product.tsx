import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
import { addCartItemAsync } from "../../redux/actionCreators/CartActions";

//@ts-ignore
import styles from "./Home.module.css";

//types
import { ProductItem } from "../../types/ProductItem";

function Product(props: ProductItem) {
  const { id, ...rest } = props;
  const items = useAppSelector((state) => state.cartReducer.items);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded((prev) => {
      if (
        items.find(
          (el: typeof rest & { quantity: number; id: string }) =>
            el.title === props.title
        )
      ) {
        return true;
      }
      return false;
    });
  }, [items, props.title]);

  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.authReducer.isLogged);

  return (
    <div className={`${styles.productContainer} ${styles.container}`}>
      <li>
        <Link className={styles.Link} to={`/products/${props.id}`}>
          <h3>{props.title}</h3>
        </Link>
        <p>{props.description}</p>
        {logged ? (
          <>
            {isAdded ? (
              <span style={{ color: "green" }}>Товар уже в корзине</span>
            ) : (
              <button
                className={styles.Btn}
                onClick={() =>
                  dispatch(addCartItemAsync({ ...rest, quantity: 1 }))
                }
              >
                Добавить товар
              </button>
            )}
          </>
        ) : (
          <span style={{ color: "red" }}>Чтобы добавить залогиньтесь</span>
        )}
      </li>
      <div></div>
    </div>
  );
}

export default Product;
