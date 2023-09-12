import React from 'react';
import {FaMinus, FaPlus} from "react-icons/fa"

const CartQuantityToggle = ({quantity, setDecrease, setIncrease}) => {
  return (
    <div className="cart-button">
        <div className="amount-toggle">
            <button onClick={() => setDecrease()}>
                <FaMinus />
            </button>
            <div className="amount-style">
                {quantity}
            </div>
            <button onClick={() => setIncrease()}>
                <FaPlus />
            </button>
        </div>
    </div>
  )
};

export default CartQuantityToggle;