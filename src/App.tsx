import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import Home from "./pages/home/HomePage";
import About from "./pages/about/About";
import SingleProducts from "./pages/product/SingleProducts";
import Cart from "./pages/cart/Cart";

import CommonLayout from "./pages/common/CommonLayout";
import ErrorPage from "./pages/404/ErrorPage";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
