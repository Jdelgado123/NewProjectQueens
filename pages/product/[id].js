import { useState } from 'react'
import axios from 'axios'
import { FiShare } from 'react-icons/fi'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { useStateContext } from '../../context/StateContext'

function producDetails({ product }) {
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();
  return (
    <Layout>
      <div>
        <div className="product-detail-container">
          <div>
            <div className="image-container">
              <div className='ishared'>
                <a className='ishared-color' rel='noreferrer' target="_blank"><span><FiShare></FiShare></span></a>
              </div>
            </div>
            <div className="small-images-container">
              <Image src={"/imagesServer2/" + product[0].name_img} width={370} height={370} alt="..."></Image>
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>{product[0].name}</h1>
            <h4>Detalles: </h4>
            <p>{product[0].description}</p>
            <p className="price">{product[0].price}</p>
            <div className="quantity">
              <h3>Cantidad:</h3>
              <p className="justify-between grid gap-4 grid-cols-3 items-center">
                <span className="text-red-500/100" onClick={decQty}><AiOutlineMinus /></span>
                <span className="num">{qty}</span>
                <span className="text-green-500/100" onClick={incQty}><AiOutlinePlus /></span>
              </p>
            </div>
            <div className="buttons">
              <button type="button" className="add-to-cart" onClick={()=> onAdd(product[0],qty)}>Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { query } = context
  const { id } = query
  const aea = { idbody: id }
  const { data: product } = await axios.post('http://localhost:3000/api/uproduct', aea);
  return {
    props: {
      product,
    }
  }
}

export default producDetails

