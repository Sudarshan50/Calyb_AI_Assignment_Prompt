import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
    const {cartItem,addCart,removeFromCart} = useContext(StoreContext);

  return (
    <div className="food__item">
      <div className="food__item__img__container">
        <img src={image} className="food__item__image" alt="" />
        {

            !cartItem[id] ? <img className="add" onClick={()=>addCart(id)} src={assets.add_icon_white} alt=""/> :
            <div className="food__item__counter">
                <img onClick = {()=> removeFromCart(id)}src={assets.remove_icon_red} alt= ""/>
                <p>{cartItem[id]}</p>
                <img onClick = {()=> addCart(id)}src={assets.add_icon_green} alt=""/>
            </div>
        }
      </div>
      <div className="food__item__info">
        <div className="food__item__name__rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food__item__desciption">{description}</p>
        <div className="food__item__price">
          <p>${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
