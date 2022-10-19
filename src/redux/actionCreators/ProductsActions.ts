import { ProductItem } from "../../types/ProductItem";
import { Dispatch } from "react";

type Options<T extends Request> = {
  [P in keyof T]: P extends "body" ? string : T[P];
};

type RequestOptions = Partial<Options<Request>>;

const getProductsAsync = () => (dispatch: Dispatch<ProductAction>) => {
  dispatch(productsLoading(true));

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "true");

  const options: RequestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(`https://panicky-swimsuit-tuna.cyclic.app/products`, options).then(
    (req) => {
      if (!req.ok) {
        dispatch(productsLoading(false));
        dispatch(productsError());
      } else {
        dispatch(productsLoading(false));
        req.json().then((res) => dispatch(getProducts(res)));
      }
    }
  );
};

const updateProductAsync =
  (id: string, data: ProductItem) => (dispatch: Dispatch<ProductAction>) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "true");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      ...data,
    });

    const requestOptions: RequestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://panicky-swimsuit-tuna.cyclic.app/products/${id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          dispatch(productsError());
        } else {
          dispatch(updateProduct(id, data));
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

const deleteProductAsync =
  (id: string) => (dispatch: Dispatch<ProductAction>) => {
    const options: RequestOptions = {
      method: "DELETE",
      headers: new Headers({
        Authorization: "true",
      }),
    };

    fetch(
      `https://panicky-swimsuit-tuna.cyclic.app/products/${id}`,
      options
    ).then((req) => {
      if (!req.ok) {
        dispatch(productsError());
      } else {
        dispatch(deleteProduct(id));
      }
    });
  };

const addProductAsync =
  (data: ProductItem) => (dispatch: Dispatch<ProductAction>) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "true");
    myHeaders.append("Content-Type", "application/json");

    const options: RequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    fetch(`https://panicky-swimsuit-tuna.cyclic.app/products`, options).then(
      (req) => {
        if (!req.ok) {
          dispatch(productsError());
        } else {
          dispatch(addProduct(data));
        }
      }
    );
  };

enum ProductActionTypes {
  "GET_PRODUCTS" = "GET_PRODUCTS",
  "DELETE_PRODUCT" = "DELETE_PRODUCT",
  "ADD_PRODUCT" = "ADD_PRODUCT",
  "UPDATE_PRODUCT" = "UPDATE_PRODUCT",
  "PRODUCTS_ERROR" = "PRODUCTS_ERROR",
  "PRODUCTS_LOADING" = "PRODUCTS_LOADING",
}

interface GetProductsAction {
  type: ProductActionTypes.GET_PRODUCTS;
  payload: Array<ProductItem>;
}

function getProducts(products: ProductItem[]): GetProductsAction {
  return {
    type: ProductActionTypes.GET_PRODUCTS,
    payload: products,
  };
}

interface DeleteProductAction {
  type: ProductActionTypes.DELETE_PRODUCT;
  payload: string;
}

function deleteProduct(id: string): DeleteProductAction {
  return {
    type: ProductActionTypes.DELETE_PRODUCT,
    payload: id,
  };
}

interface AddProductAction {
  type: ProductActionTypes.ADD_PRODUCT;
  payload: ProductItem;
}

function addProduct(data: ProductItem): AddProductAction {
  return {
    type: ProductActionTypes.ADD_PRODUCT,
    payload: data,
  };
}

interface UpdateProductActionPayload {
  data: ProductItem;
  id: string;
}

interface UpdateProductAction {
  type: ProductActionTypes.UPDATE_PRODUCT;
  payload: UpdateProductActionPayload;
}

function updateProduct(id: string, data: ProductItem): UpdateProductAction {
  return {
    type: ProductActionTypes.UPDATE_PRODUCT,
    payload: {
      data: data,
      id: id,
    },
  };
}

interface ErrorAction {
  type: ProductActionTypes.PRODUCTS_ERROR;
}

function productsError(): ErrorAction {
  return {
    type: ProductActionTypes.PRODUCTS_ERROR,
  };
}

interface LoadingAction {
  type: ProductActionTypes.PRODUCTS_LOADING;
  payload: boolean;
}

function productsLoading(flag: boolean): LoadingAction {
  return {
    type: ProductActionTypes.PRODUCTS_LOADING,
    payload: flag,
  };
}

type ProductAction =
  | ReturnType<typeof productsLoading>
  | ReturnType<typeof productsError>
  | ReturnType<typeof updateProduct>
  | ReturnType<typeof addProduct>
  | ReturnType<typeof getProducts>
  | ReturnType<typeof deleteProduct>
  | ReturnType<typeof productsLoading>;

export {
  getProductsAsync,
  updateProductAsync,
  deleteProductAsync,
  addProductAsync,
  ProductActionTypes,
};
export type { ProductAction };
