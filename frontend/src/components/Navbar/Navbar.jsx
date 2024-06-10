import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'
const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <img src={assets.logo} alt=" " className="logo" />
      <ul className="navbar__menu">
        <Link to = '/' onClick={()=>setMenu("home")} className={menu == "home" ? "active" : ""}> Home </Link>
        <a href = '#explore__menu'onClick={()=>setMenu("menu")} className={menu == "menu" ? "active" : ""}>Menu</a>
        <a href = '#footer' onClick={()=>setMenu("contact__us")} className={menu == "contact__us" ? "active" : ""}>Contact-us </a>
      </ul>
      <div className="navbar__right">
        <img src={assets.search_icon}></img>
        <div className="navbar__search__icon">
          <img src={assets.basket_icon} alt=""></img>
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
