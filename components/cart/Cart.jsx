import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import Image from 'next/image';
import axios from 'axios'

import { useStateContext } from '../../context/StateContext';


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const sendRequired = async (cartItems) => {
    
    cartItems.totalPrice= totalPrice
    await axios.post('/api/teller', {cartItems,totalPrice})

  }
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Tu carrito</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">

            <h3 className='p-12'>Tu carrito esta vacío </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continuar Comprando
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item.id_product}>
              <Image src={JSON.parse(item.name_img)[0]} className="cart-product-image" width={375} height={290} alt="..." />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="justify-between grid gap-4 grid-cols-3 items-center">
                      <span className="text-red-500/100" onClick={() => toggleCartItemQuanitity(item, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{item.quantity}</span>
                      <span className="text-green-500/100" onClick={() => toggleCartItemQuanitity(item, 'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div>

                  
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="buttons">
              <Link href={'/succes/'}>
                <button type="button" className="buy-now" onClick={() => sendRequired(cartItems)}>
                  Realizar pedido
                </button>
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart