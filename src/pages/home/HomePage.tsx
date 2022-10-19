import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
import { getProductsAsync } from "../../redux/actionCreators/ProductsActions";

//components
import Product from "./Product";
import AdminProduct from "./AdminProduct";

//types
import { ProductItem } from "../../types/ProductItem";
import { RootState } from "../../redux/store";

function Home() {
  const [error, setError] = useState(false);
  const [makeRequest, setMakeRequest] = useState(false);
  const loading = useAppSelector((state) => state.productReducer.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      dispatch(getProductsAsync());
    } catch (err) {
      setError(true);
      console.error(err);
    }
  }, [makeRequest]);
  const products = useAppSelector(
    (state: RootState) => state.productReducer.products
  );
  const admin = useAppSelector((state: RootState) => state.authReducer.isAdmin);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {error ? (
            <section>
              <h1>Попробуйте еще раз</h1>
              <button onClick={() => setMakeRequest((prev) => !prev)}>
                Получить данные заново
              </button>
            </section>
          ) : (
            <ul>
              {admin
                ? products.map((el: ProductItem) => {
                    return <AdminProduct key={el.id} {...el} />;
                  })
                : products.map((el: ProductItem) => {
                    return <Product key={el.id} {...el} />;
                  })}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}

export default Home;
