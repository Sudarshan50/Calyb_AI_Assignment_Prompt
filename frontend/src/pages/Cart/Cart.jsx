import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { useNavigate } from "react-router-dom";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import PlaceOrder from "../PlaceOrder/PlaceOrder";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotal } =
    React.useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart__items">
        <div className="cart__items__title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <>
                <div
                  className="cart__items__item cart__items__title"
                  key={index}
                >
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${cartItem[item._id] * item.price}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart__bottom">
        <div className="cart__total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart__total__details">
              <p>Subtotal</p>
              <p>${getTotal()}</p>
            </div>
            <hr />
            <div className="cart__total__details">
              <p>Delivery Fee</p>
              <p>${getTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart__total__details">
              <p>Total</p>
              <p>${getTotal() === 0 ? 0 : getTotal() + 2}</p>
            </div>
          </div>
          <button onClick={() => navigate("/placeorder")}>
            Proceed to CheckOut
          </button>
        </div>
        <div className="cart__promocode">
          <div>
            <p>If you have the promo code, Enter it here</p>
            <div className="cart__promocode__input">
              <input type="text" placeholder="promo code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
