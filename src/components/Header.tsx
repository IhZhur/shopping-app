import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../styles/Header.css";

const Header: React.FC = () => {
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <header className="header">
      <Link to="/" className="logo">🛍️ My Shop</Link>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/cart" className="cart-link">
          Cart ({cartItemsCount})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
