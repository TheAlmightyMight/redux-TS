import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";
import { loginAsync, authError } from "../../redux/actionCreators/AuthActions";

const CSS = {
  width: "320px",
  height: "320px",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  left: "0",
  right: "0",
  top: "50%",
  transform: "translateY(-50%)",
};

const CSS2 = {
  height: "30px",
  width: "260px",
  marginBottom: "20px",
};

const Btn = {
  height: "30px",
  aspectRatio: "1",
  borderRadius: "50%",
  background: "red",
  position: "relative",
  right: "-300px",
};

function Modal() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const error = useAppSelector((state) => state.authReducer.error);
  const dispatch = useAppDispatch();
  const loginHandler = (e) => {
    setName(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ login: name, password: password }));
  };
  return (
    <dialog open={true} style={CSS as React.CSSProperties}>
      {error ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>No such user</h3>
          <button onClick={() => dispatch(authError(false))}>Try again</button>
        </div>
      ) : (
        <>
          <button
            style={Btn as React.CSSProperties}
            onClick={() => dispatch(setModalVisibility(false))}
          >
            X
          </button>
          <form
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <fieldset
              style={{
                height: "150px",
              }}
            >
              <legend>Авторизация</legend>
              <input
                onChange={(e) => loginHandler(e)}
                style={CSS2}
                type="text"
              />
              <input
                onChange={(e) => passwordHandler(e)}
                style={CSS2}
                type="text"
              />
              <button onClick={(e) => clickHandler(e)}>Войти</button>
              <button
                onClick={(e) =>
                  (() => {
                    e.preventDefault();
                    dispatch(setModalVisibility(false));
                  })()
                }
              >
                Отмена
              </button>
            </fieldset>
          </form>
        </>
      )}
    </dialog>
  );
}

export default Modal;
