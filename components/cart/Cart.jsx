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
    console.log(cartItems)
    await axios.post('/api/teller', cartItems)

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
              <Image src={"/imagesServer2/"+JSON.parse(item.name_img)[0]} className="cart-product-image" width={375} height={290} alt="..." />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="justify-between grid gap-4 grid-cols-3 items-center">
                      <span className="text-red-500/100" onClick={() => toggleCartItemQuanitity(item.id_product, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{item.quantity}</span>
                      <span className="text-green-500/100" onClick={() => toggleCartItemQuanitity(item.id_product, 'inc')}><AiOutlinePlus /></span>
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
              
                <button type="button" className="buy-now" onClick={() => sendRequired(cartItems)}>
                  Realizar pedido
                </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

/* 

<a href= {`https://wa.me/51986775834?text=El%20carrito%20tiene%20${totalPrice}%20de%20valor,%20lista%20de%20compras${cartItems.map((item)=>("%0AObjeto:"+item.name+"  Precio Unitario:"+item.price+" Cantidad:"+item.quantity+"%0A"))}`} rel='noreferrer' target="_blank">
              <button type="button" className="buy-now">
                Pagar Ahora
              </button>
              </a>

*/