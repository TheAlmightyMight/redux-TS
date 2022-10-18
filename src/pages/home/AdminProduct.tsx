import React, { useState, useRef } from "react";
import { useAppDispatch } from "../../types/redux-hooks";

//actions
import {
  updateProductAsync,
  deleteProductAsync,
} from "../../redux/actionCreators/ProductsActions";

import { ProductItem } from "../../types/ProductItem";

function AdminProduct(props: ProductItem) {
  const { description, title, stock, id, ...rest } = props;
  const dispatch = useAppDispatch();

  const [name, setName] = useState(title);
  const [text, setText] = useState(description);
  const [amount, setAmount] = useState(stock);

  const nameInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stockInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionTextArea =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const clearData = () => {
    setName(title);
    nameInput.current.value = title;
    setText(description);
    stockInput.current.value = String(stock);
    setAmount(stock);
    descriptionTextArea.current.value = description;
  };

  const updateProduct = () => {
    const item = {
      ...rest,
      id: id,
      title: name,
      description: text,
      stock: amount,
    };
    console.log(item);
    dispatch(updateProductAsync(id, item));
  };

  return (
    <li style={{ display: "flex" }}>
      <input
        name="name"
        ref={nameInput}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        name="quantity"
        ref={stockInput}
        onFocus={() => void 0}
        onChange={(e) => setAmount(Number(e.target.value))}
        value={amount}
      />
      <textarea
        name="description"
        ref={descriptionTextArea}
        onChange={(e) => setText(e.target.value)}
        style={{ resize: "none", width: "300px", height: "100px" }}
        defaultValue={text}
      ></textarea>
      <button onClick={clearData}>Отмена</button>
      <button onClick={() => updateProduct()}>Сохранить</button>
      <button onClick={() => dispatch(deleteProductAsync(id))}>Удалить</button>
    </li>
  );
}

export default AdminProduct;
