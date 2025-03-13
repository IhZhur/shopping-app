import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails"; 
import Header from "./components/Header";
import Checkout from "./pages/Checkout";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} /> {/*  Маршрут */}
        <Route path="/checkout" element={<Checkout />} /> {/* Маршрут */}
      </Routes>
    </Router>
  );
};

export default App;
