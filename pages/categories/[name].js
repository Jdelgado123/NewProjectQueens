/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { valorLocalhost } from '../../utils/globals'

const categories = ({ products }) => {
  const [src,setSrc] = useState('/a')

  const [idpr,setIdpr] = useState(0)

  const togleModalImages = (id,image) => {
    document.querySelector('#modalImages').classList.toggle('hidden')

    setIdpr(id)

    setSrc("/imagesServer2/"+image)
  }
  const togleModalImagesx = () => {
    document.querySelector('#modalImages').classList.toggle('hidden')
  }

  return (
    <Layout>
      <div className='grid gap-1 md:gap-6 grid-cols-3 md:grid-cols-4'>

        {products.map((product, index) => (
          <div key={index} className="max-w-sm bg-white shadow-xl">

            <div className='relative overflow-hidden'>
              <Image id={"img" + index} src={"/imagesServer2/" + product.name_img.replace(/['"]+/g, '')} width={375} height={325} alt="product image" onClick={() => togleModalImages(product.id_product, product.name_img.replace(/['"]+/g, ''))} />
              {(product.stock == 0) ? <div className='absolute bottom-0 -mr-12 mb-4 rounded-br-lg right-0 bg-red-500 border-solid border-1 -rotate-45 whitespace-nowrap px-4 text-sm md:text-base w-36 md:w-40 h-6 md:h-8 text-center text-white'>AGOTADO</div> : null}
            </div>

          </div>
        ))}


        <div id="modalImages" tabIndex="-1" className="hidden overflow-y-auto overflow-x-visible fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid">

          <div className='fixed inset-0 bg-gray-700 bg-opacity-70'></div>

          <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="relative justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <button type="button" className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={() => togleModalImagesx()}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <div>
                <Image id='sss' src={src} width={375} height={325} alt="product image" />

                <Link href={`/product/${idpr}`}>
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">Detalles</button>
                </Link>

              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { name } = context.query
  const { data: products } = await axios.get(`http://${valorLocalhost}:3000/api/categoriesList`, { params: { name: name } });
  return {
    props: {
      products,
    }
  }
}

export default categories