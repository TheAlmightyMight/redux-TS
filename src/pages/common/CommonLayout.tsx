import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/redux-hooks";

import { logout } from "../../redux/actionCreators/AuthActions";

import AdminModal from "./AdminModal";
import AuthIcon from "./AuthIcon";
import CartIcon from "./CartIcon";

const CSS = {
  width: "100%",
  height: "80px",
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
  background: "#72A0C1",
  color: "#0071c5",
};

function CommonLayout() {
  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const dispatch = useAppDispatch();
  const amount = useAppSelector((state) => state.cartReducer.items.length);
  const logged = useAppSelector((state) => state.authReducer.isLogged);
  const admin = useAppSelector((state) => state.authReducer.isAdmin);
  const price = useAppSelector((state) =>
    state.cartReducer.items
      .map((el) => Number(el.price) * Number(el.quantity))
      .reduce((a: number, b: number) => a + b, 0)
  );
  return (
    <nav style={CSS}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Link style={{ textDecoration: "none", color: "#0071c5" }} to="/">
          <h1 style={{ fontSize: "24px", marginLeft: "30px" }}>MyShop</h1>
        </Link>

        <menu
          style={{
            listStyle: "none",
            display: "flex",
            fontSize: "20px",
          }}
        >
          <li style={{ marginRight: "30px" }}>
            <Link
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                color: hover ? "red" : "#0071c5",
                textDecoration: "none",
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onMouseOver={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              style={{
                color: hover2 ? "red" : "#0071c5",
                textDecoration: "none",
              }}
              to="/about"
            >
              About
            </Link>
          </li>
        </menu>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {logged && !admin ? (
          <Link style={{ marginRight: "20px" }} to="/cart">
            <CartIcon />
          </Link>
        ) : null}

        {logged || admin ? (
          <div
            onClick={() => dispatch(logout())}
            style={{ cursor: "pointer", marginRight: "2rem" }}
          >
            Выйти
          </div>
        ) : (
          <AuthIcon />
        )}

        {logged && !admin ? (
          <span style={{ margin: "0 20px 0 30px", width: "150px" }}>
            {amount} Total amount <br />
            {price} Total price
          </span>
        ) : null}

        {admin ? (
          <span onClick={() => setShowAdminModal(true)}>Добавить товар</span>
        ) : null}
        {showAdminModal ? (
          <AdminModal
            shown={showAdminModal}
            setShowAdminModal={setShowAdminModal}
          />
        ) : null}
      </div>
    </nav>
  );
}

export default CommonLayout;
