import React, { useState } from "react";

function Quantity({quantity, setQuantity}) {
  const incrementQuantity = () => {
    if (quantity >= 0) {
      setQuantity((item) => item + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((item) => item - 1);
    }
  };

  return (
    <div className="quantity-box">
      <span onClick={decrementQuantity} className='bg'>-</span>
      <span>{quantity}</span>
      <span onClick={incrementQuantity} className='bg'>+</span>
    </div>
  );
}

export default Quantity;
