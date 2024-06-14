import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ChatOverlay from "./components/ChatBox/ChatOverlay";

const App = () => {
  const[showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <>
    {showLoginPopup && <LoginPopup setShowLogIn = {setShowLoginPopup} />}
      <div className="app">
        <Navbar setShowLogIn = {setShowLoginPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <ChatOverlay apiUrl="http://localhost:4000" />
      <Footer />
    </>
  );
};

export default App;
