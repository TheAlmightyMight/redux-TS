import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/home/HomePage";
import About from "./pages/about/About";
import SingleProducts from "./pages/product/SingleProducts";
import Cart from "./pages/cart/Cart";

import CommonLayout from "./pages/common/CommonLayout";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <CommonLayout />
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
