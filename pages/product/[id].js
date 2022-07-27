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
  const images = JSON.parse(product[0].name_img)

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
            <span className='self-center text-xl font-semibold text-center'>Zaffari's Boutique</span>

            <div className="product-detail-desc">
              <div>
                <p className="price">{product[0].currency == "USD" ? "$" : "S/."}{product[0].price}</p>
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
                <button className="md:col-start-2 text-indigo-100 text-4xl transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2"><i><AiOutlineShoppingCart className='display-block m-auto'></AiOutlineShoppingCart></i></button>
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



/*
<h3 className='pt-6'>Stock Disponible:</h3>
            <p>{stocks}</p>



<div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
            <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">

            </div>
            <div className="carousel-inner relative w-full overflow-hidden">
              <div className="carousel-item active relative float-left w-full">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                  className="block w-full"
                  alt="..."
                />
                
              </div>
              <div className="carousel-item inactive relative float-left w-full">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                  className="block w-full"
                  alt="..."
                />
                
              </div>
              <div className="carousel-item relative float-left w-full">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                  className="block w-full"
                  alt="..."
                />
                
              </div>
            </div>
            <button
              className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

            */



/*


<div className="image-container">
        <Image src={"/imagesServer2/" + images[index]} width={350} height={250} alt="..."></Image>
      </div>
      <div className="small-images-container">
        {images.map((item, i) => (

          <Image
            key={i}
            src={"/imagesServer2/" + item}
            className={i === index ? 'small-image selected-image ' : 'small-image '}
            onMouseEnter={() => setIndex(i)}
            width={80}
            height={85}
            alt="..."
          />

        ))}
      </div>


*/