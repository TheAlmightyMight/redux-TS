import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/home/Home.tsx";
import About from "./pages/about/About.tsx";
import SingleProducts from "./pages/product/SingleProducts.tsx";
import Cart from "./pages/cart/Cart.tsx";

import CommonLayout from "./pages/common/CommonLayout.tsx";
import Modal from "./pages/common/Modal.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

function App() {
  const modal = useSelector((state) => state.authReducer.modalShown);
  return (
    <BrowserRouter>
      <CommonLayout />
      {modal ? <Modal /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<SingleProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
