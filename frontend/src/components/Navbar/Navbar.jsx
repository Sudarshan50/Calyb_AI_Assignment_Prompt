import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'
import { StoreContext } from "../Context/StoreContext";
const Navbar = ({setShowLogIn}) => {
  const [menu, setMenu] = useState("home");
  const {getTotal} = useContext(StoreContext)

  return (
    <div className="navbar">
      <Link to= '/'><img src={assets.logo} alt=" " className="logo" /></Link>
      <ul className="navbar__menu">
        <Link to = '/' onClick={()=>setMenu("home")} className={menu == "home" ? "active" : ""}> Home </Link>
        <a href = '#explore__menu'onClick={()=>setMenu("menu")} className={menu == "menu" ? "active" : ""}>Menu</a>
        <a href = '#footer' onClick={()=>setMenu("contact__us")} className={menu == "contact__us" ? "active" : ""}>Contact-us </a>
      </ul>
      <div className="navbar__right">
        <img src={assets.search_icon}></img>
        <div className="navbar__search__icon">
          <Link to= '/cart'><img className="navbar__basket" src={assets.basket_icon} alt=""></img></Link>
          <div className={getTotal() === 0? "":"dot"}></div>
        </div>
        <button onClick={()=>setShowLogIn(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
