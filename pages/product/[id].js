/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import axios from 'axios'
import db from '../../config/db'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { useStateContext } from '../../context/StateContext'
import toast, { Toaster } from 'react-hot-toast'
import { valorLocalhost } from "../../utils/globals"


let count = 0
function producDetails({ product, result }) {
  const [index, setIndex] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [iclick, setIclick] = useState(0);

  const { decQty, incQty, qty, onAdd, setQty } = useStateContext();

  const namei = product[0].name_imgs

  const images = JSON.parse(namei)


  useEffect(() => {
    setStocks(product[0].stock)
    setQty(1)
  }, [])

  const changeStockbySize = (stock, value, i) => {
    setStocks(stock)
    setIclick(i)
    product[0].sizename = value
  }
  const next = () => {
    count = (count + 1) % images.length;
    setIndex(count)
  }

  const prev = () => {
    const productsLenthg = images.length
    count = (index + productsLenthg - 1) % productsLenthg;
    setIndex(count)
  }

  return (
    <Layout>
      <div className='block m-auto self-center'>
        <div><Toaster></Toaster></div>
        <div className="product-detail-container">
          <div>

            <div id="carouselExampleControls" className="carousel slide relative" data-bs-ride="carousel">
              <div className="carousel-inner relative w-full overflow-hidden">

                <div className="carousel-item active relative float-left w-full">
                  <Image
                    src={"/imagesServer2/" + images[index]}
                    width={400}
                    height={300}
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
                onClick={() => prev()}
              >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
                onClick={() => next()}
              >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

          </div>
          <div className='grid gap-1 md:gap-6 grid-cols-1 md:grid-cols-1 mx-auto container'>
            <span className='self-center text-xl font-semibold text-center'>{product[0].name}</span>

            <div className="product-detail-desc">
              <div>
                {product[0].price_offer>0
                ?
                <p className="price"><h1 className='line-through'>{product[0].currency == "USD" ? "$" : "S/."}{product[0].price}</h1><h1 className='flex text-green-400'>{product[0].currency == "USD" ? "$" : "S/."}{product[0].price_offer}</h1></p>
                :
                <p className="price">{product[0].currency == "USD" ? "$" : "S/."}{product[0].price}</p>}
                
                <div className="quantity">
                  <h3>Cantidad:</h3>
                  <p className="justify-between grid gap-4 grid-cols-3 items-center">
                    <span className="text-red-500/100" onClick={decQty}><AiOutlineMinus /></span>
                    <span className="num">{qty}</span>
                    <span className="text-green-500/100" onClick={() => (qty >= product[0].stock) ? toast.error("Ya no hay productos en el almacen") : incQty()}><AiOutlinePlus /></span>
                  </p>
                </div>
              </div>
              <div className="buttons-size">
                {(result.length == 0) ? undefined : result.map((item, i) => (<button type="button" className={i === iclick ? "add-to-size selected-image" : "add-to-size"} key={i} onClick={() => changeStockbySize(item.stock, item.sizename, i)}>{item.sizename}</button>))}
              </div>

              <div className="grid gap-1 md:gap-6 grid-cols-1 md:grid-cols-3 pt-8 ">
                <button className="md:col-start-2 text-indigo-100 text-4xl transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2" onClick={() => onAdd(product[0], qty)}><i><AiOutlineShoppingCart className='display-block m-auto'></AiOutlineShoppingCart></i></button>
              </div>

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