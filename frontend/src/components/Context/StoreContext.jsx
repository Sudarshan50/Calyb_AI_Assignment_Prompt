import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/assets";
export const StoreContext = createContext(null);


const StoreContextProvider = (props) => 
{

    const [cartItem,setCartItem] = useState({});
    const addCart = (itemId) =>{
        if(!cartItem[itemId])
        {
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId) =>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const conextValue = 
    {
        food_list,cartItem,setCartItem,addCart,removeFromCart

    }


    useEffect(()=>{
        console.log(cartItem)
    },[cartItem])
    return(
        <StoreContext.Provider value = {conextValue}>
            {props.children}
        </StoreContext.Provider>
    )
    
}
export default StoreContextProvider;