import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
const PlaceOrder = () => {
  const { getTotal } = useContext(StoreContext);
  return (
    <form className="place__order">
      <div className="place__order__left">
        <p className="title">Delivery Information</p>
        <div className="multi__fields">
          <input type="text" placeholder="First Name"></input>
          <input type="text" placeholder="Last Name"></input>
        </div>

        <input type="email" placeholder="Email Adress"></input>
        <input type="text" placeholder="Street"></input>
        <div className="multi__fields">
          <input type="text" placeholder="City"></input>
          <input type="text" placeholder="State"></input>
        </div>
        <div className="multi__fields">
          <input type="text" placeholder="Zip Code"></input>
          <input type="text" placeholder="Country"></input>
        </div>
        <input type="text" placeholder="Phone Number"></input>
      </div>

      <div className="place__order__right">
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
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
