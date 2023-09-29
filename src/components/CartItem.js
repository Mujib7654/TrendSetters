import React from 'react';
import FormatPrice from "../helper/FormatPrice";
import CartQuantityToggle from './CartQuantityToggle';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/cartContext';

const CartItem = ({id, name, image, color, price, quantity}) => {
    const {removeItem, setDecrease, setIncrease} = useCartContext();

    // const setDecrease = () => {
    //     // quantity > 1 ? setQuantity(quantity-1) : setQuantity(1);
    //   };
  
    //   const setIncrease = () => {
    //     // quantity < stock ? setQuantity(quantity+1): setQuantity(stock);
    //   };

  return (
    <div className="cart_heading grid grid-five-column">

        {/* image, name, color */}
        <div className="cart-image--name">
            <div>
                <figure>
                    <img src={image} alt= {id}/>
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <div className="color-div">
                    <p>color:</p>
                    <div className="color-style" style={{backgroundColor: color, color: color}}></div>
                </div>
            </div> 
        </div>

        {/* price */}
        <div className="cart-hide">
            <p>
                <FormatPrice price={price}/>
            </p>
        </div>

        {/* Quantity */}
        <CartQuantityToggle 
          quantity = {quantity} 
          setDecrease= {() => setDecrease(id)} 
          setIncrease= {() => setIncrease(id)} 
        />

        {/* subtotal */}
        <div className="cart-hide">
            <p><FormatPrice price = {price*quantity}/></p>
        </div>

        {/* delete button */}
        <div>
            <FaTrash className="remove_icon" onClick={()=> removeItem(id)}/>
        </div>
    </div>
  )
}

export default CartItem