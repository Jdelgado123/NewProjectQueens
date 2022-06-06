import {useState} from 'react'
import axios from 'axios'
import {FiShare} from 'react-icons/fi'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

function producDetails() {
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <div className='ishared'>
              <a className='ishared-color' rel='noreferrer' target="_blank"><span><FiShare></FiShare></span></a>
            </div>
          </div>
          <div className="small-images-container">
           
          </div>
        </div>

        <div className="product-detail-desc">
          <h1></h1>
          <h4>Detalles: </h4>
          <p>asas</p>
          <p className="price">80</p>
          <div className="quantity">
            <h3>Cantidad:</h3>
            <p className="quantity-desc">
              <span className="minus"><AiOutlineMinus /></span>
              <span className="num">1</span>
              <span className="plus"><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart">Agregar al Carrito</button>            
            <a rel='noreferrer' target="_blank">
                <button type="button" className="buy-now">Comprar ahora</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async(context) =>{
  const {data:products} =await axios.get('http://192.168.0.8:3000/api/home');
  return{
    props:{
      products,
    }
  }
}

export default producDetails

