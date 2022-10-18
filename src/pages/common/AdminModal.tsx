import React, { useRef } from "react";
import { useAppDispatch } from "../../types/redux-hooks";
//@ts-ignore
import { addProductAsync } from "../../redux/actionCreators/ProductsActions.ts";

const CSS = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};

const Container = {
  width: "360px",
  position: "fixed",
  left: "0",
  right: "0",
  top: "50%",
  transform: "translateY(-50%)",
  margin: "0 auto",
};

const Btn = {
  width: "100px",
  height: "25px",
};

function AdminModal({ shown, setShowAdminModal }) {
  const dispatch = useAppDispatch();
  const name = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stock = useRef() as React.MutableRefObject<HTMLInputElement>;
  const price = useRef() as React.MutableRefObject<HTMLInputElement>;
  const picture = useRef() as React.MutableRefObject<HTMLInputElement>;
  const desc = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const handler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      addProductAsync({
        title: name.current.value,
        stock: stock.current.value,
        price: price.current.value,
        picture: picture.current.value,
        description: desc.current.value,
      })
    );
  };
  return (
    <dialog style={Container as React.CSSProperties} open={shown}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <fieldset style={CSS as React.CSSProperties}>
          <legend>Новый товар</legend>
          <label htmlFor="title">name</label>
          <input ref={name} name="title" />
          <label htmlFor="stock">stock</label>
          <input ref={stock} name="stock" />
          <label htmlFor="price">price</label>
          <input ref={price} name="price" />
          <label htmlFor="picture">image</label>
          <input
            ref={picture}
            placeholder="image"
            defaultValue="https://dummyimage.com/500x500/000/fff.png"
            name="picture"
          />
          <label htmlFor="description">about</label>
          <textarea style={{ resize: "none" }} ref={desc} name="description" />
        </fieldset>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <button style={Btn} onClick={(e) => handler(e)}>
          Создать
        </button>
        <button style={Btn} onClick={() => setShowAdminModal()}>
          Закрыть
        </button>
      </div>
    </dialog>
  );
}

export default AdminModal;
