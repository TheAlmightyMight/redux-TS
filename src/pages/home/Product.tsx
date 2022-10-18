import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
import { addCartItemAsync } from "../../redux/actionCreators/CartActions";

//types
import { ProductItem } from "../../types/ProductItem";

function Product(props: ProductItem) {
  const { id, ...rest } = props;
  const items = useAppSelector((state) => state.cartReducer.items);
  const [isAdded, setIsAdded] = useState(false);

  //? fix
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
    <div>
      <li>
        <Link to={`/products/${props.id}`}>
          <h3>{props.title}</h3>
        </Link>
        <p>{props.description}</p>
        {logged ? (
          <>
            {isAdded ? (
              <button>Товар уже в корзине</button>
            ) : (
              <button
                //change action typings
                onClick={() =>
                  dispatch(addCartItemAsync({ ...rest, quantity: 1 }))
                }
              >
                Добавить товар
              </button>
            )}
          </>
        ) : (
          <button>Чтобы добавить залогиньтесь</button>
        )}
      </li>
    </div>
  );
}

export default Product;
