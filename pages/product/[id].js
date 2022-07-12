/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import axios from 'axios'
import db from '../../config/db'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { useStateContext } from '../../context/StateContext'
import toast, { Toaster } from 'react-hot-toast'
import {valorLocalhost} from "../../utils/globals"

function producDetails({ product, result }) {
  const [index, setIndex] = useState(0);
  const [stocks,setStocks] = useState(0);
  const [iclick,setIclick] = useState(0);
  
  const { decQty, incQty, qty, onAdd,setQty } = useStateContext();
  const images = JSON.parse(product[0].name_img)

  useEffect(()=>{
    setStocks(product[0].stock)
    setQty(1)
  },[])

  const changeStockbySize = (stock,value,i) =>{
    setStocks(stock)
    setIclick(i)
    product[0].sizename = value
  }

  return (
    <Layout>
      <div>
        <div><Toaster></Toaster></div>
        <div className="product-detail-container">
          <div>
            <div className="image-container">
              <Image src={"/imagesServer2/" + images[index]} width={450} height={450} alt="..."></Image>
            </div>
            <div className="small-images-container">
              {images.map((item, i) => (
                <Image
                  key={i}
                  src={"/imagesServer2/" + item}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                  width={90}
                  height={95}
                  alt="..."
                />
              ))}
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>{product[0].name}</h1>
            <h4>Detalles: </h4>
            <p>{product[0].description}</p>
            <p className="price">{product[0].currency == "USD" ? "$" : "S/."}{product[0].price}</p>
            <div className="quantity">
              <h3>Cantidad:</h3>
              <p className="justify-between grid gap-4 grid-cols-3 items-center">
                <span className="text-red-500/100" onClick={decQty}><AiOutlineMinus /></span>
                <span className="num">{qty}</span>
                <span className="text-green-500/100" onClick={() => (qty >= product[0].stock) ? toast.error("Ya no hay productos en el almacen") : incQty()}><AiOutlinePlus /></span>
              </p>
            </div>

            <h3 className='pt-8'>Stock Disponible:</h3>
            <p>{stocks}</p>
            <div className="buttons-size">
              {(result.length ==0)?undefined:result.map((item,i)=>(<button type="button" className={i === iclick ? "add-to-size selected-image": "add-to-size"} key={i} onClick={()=>changeStockbySize(item.stock,item.sizename,i)}>{item.sizename}</button>))}
            </div>
            <div className="buttons">
              <button type="button" className="add-to-cart" onClick={() => onAdd(product[0], qty)}>Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.query
  const aea = { idbody: id }

  const { data: product } = await axios.post(`http://${valorLocalhost}:3000/api/uproduct`, aea);

  const [result] = await db.query(`SELECT * FROM size_product WHERE id_product=${id}`)

  return {
    props: {
      product,
      result
    }
  }
}

export default producDetails

