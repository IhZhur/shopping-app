import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearCart } from "../store/cartSlice";
import "../styles/Checkout.css";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) {
      alert("Please fill in all required fields!");
      return;
    }

    setOrderPlaced(true);
    dispatch(clearCart()); // Очищаем корзину после заказа
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h1>🎉 Thank you for your order!</h1>
        <p>We will process your order soon.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <form onSubmit={handleOrder} className="checkout-form">
          <h2>Billing Details</h2>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

          <label>Comment (optional):</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

          <button type="submit">Place Order</button>
        </form>

        <div className="checkout-summary">
          <h2>Your Order</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
