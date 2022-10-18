import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import styles from "./SingleProducts.module.css";
import { addCartItemAsync } from "../../redux/actionCreators/CartActions";

//types
import { ProductItem } from "../../types/ProductItem";

function SingleProducts() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.productReducer.products.find(
      (el: ProductItem<"dummyimage.com/500x500/000/fff.png">) => el.id === id
    )
  );
  const logged = useSelector((state) => state.authReducer.isLogged);
  return (
    <div className={styles.container}>
      <article className={styles.img}>
        <h3>{item.title}</h3>
        <figure>
          <img
            alt={`Товар ${item.id} картинка отвалилась`}
            src={item.thumbnail}
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
            onClick={() => dispatch(addCartItemAsync(item))}
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
