import React from 'react'
import "./ExploreMenu.css"
import {menu_list} from "../../assets/assets"
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore__menu' id = "explore__menu">
        <h1>Explore Our Menu</h1>
        <p className='explore__menu__text'>
            Choose from a diverse menu featuring a delicate array of dishes crafted with the finest ingredients.
        </p>
        <div className='explore__menu__list'>
            {menu_list.map((item,index)=>{
                return(
                   <div onClick= {()=> setCategory(prev => prev === item.menu_name? "All":item.menu_name) }key ={index} className='explore__menu__list__item'>
                    <img className = {category === item.menu_name ? "active":""}src={item.menu_image} alt='menu'/>
                    <p>{item.menu_name}</p>
                   </div>
                )
            })}
        </div>
            <hr/>
    </div>
  )
}

export default ExploreMenu