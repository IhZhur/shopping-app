import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [clearCartPopup, setClearCartPopup] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleMenu = (id: number) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <h2 className="empty-cart-message">Your cart is empty 🛒</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="product-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>

              {/* Поле ввода количества товаров */}
              <div className="quantity-controls">
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    for (let i = 0; i < value - item.quantity; i++) {
                      dispatch(increaseQuantity(item.id));
                    }
                    for (let i = 0; i < item.quantity - value; i++) {
                      dispatch(decreaseQuantity(item.id));
                    }
                  }}
                />
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div>

              {/* Кнопка-троеточие (⋮) с popup-меню */}
              <div className="menu-container">
                <button className="menu-button" onClick={() => toggleMenu(item.id)}>⋮</button>
                {openMenu === item.id && (
                  <div className="menu-popup">
                    <button onClick={() => dispatch(removeFromCart(item.id))}>🗑 Remove</button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>

            {/* Кнопка мусорника для очистки корзины с popup-меню */}
            <div className="cart-actions">
              <div className="menu-container">
                <button className="menu-button" onClick={() => setClearCartPopup(!clearCartPopup)}>🗑</button>
                {clearCartPopup && (
                  <div className="clear-cart-popup">
                    <p>Are you sure?</p>
                    <button onClick={() => { dispatch(clearCart()); setClearCartPopup(false); }}>Remove All</button>
                    <button onClick={() => setClearCartPopup(false)}>Cancel</button>
                  </div>
                )}
              </div>

              <Link to="/checkout">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
