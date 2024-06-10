import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogIn }) => {
  const [currStep, setCurrStep] = useState("Sign Up");
  return (
    <div className="login__popup">
      <form className="login__popup__container">
        <div className="login__popup__title">
          <h2>{currStep}</h2>
          <img
            onClick={() => setShowLogIn(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className='login__popup__inputs'>
          {currStep === "Login" ? null : (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>

        <button> {currStep === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login__popup__condition">
          <input type="checkbox" required />
          <p> I agree to the Terms and Conditions</p>
        </div>
        {currStep === "Login" ? (
          <p>
            Create a new accoung{" "}
            <span onClick={() => setCurrStep("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrStep("Login")}>Click Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
