import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Layout from '../../components/Layout'

const categories = ({products}) => {
    
  return (
    <Layout>
    <div className='grid gap-6 grid-cols-1 md:grid-cols-3 items-center justify-between'>
      {products.map((product, index) => (
        <div key={index} className="border border-solid border-blue-700/100 max-w-sm bg-white rounded-lg shadow-xl">
          <div className='p-5 shadow-xl roundend-lg'>
          <div className='relative border-2 p-1 border-solid rounded-2xl border-rose-300 items-center content-center justify-center object-center overflow-hidden'>
          
            <Link href={`/product/${product.id_product}`}>
              <Image className="pl-2 rounded-t-lg " src={"/imagesServer2/" + product.name_img.replace(/['"]+/g, '')} width={375} height={290} alt="product image" />
            </Link>
            {(product.stock==0)?<div className='absolute bottom-0 -mr-12 mb-4 rounded-br-lg right-0 bg-red-500 border-solid border-1 -rotate-45 whitespace-nowrap px-4 text-base w-36 h-8 text-center text-white'>AGOTADO</div>:null}
          </div>
          </div>
          <div className="pb-5 items-center justify-center content-center" >
            <Link href={`/product/${product.id_product}`}>
              <h2 className="text-xl text-center font-serif text-blue-700 dark:text-black">{product.name}</h2>
            </Link> 
          </div>
          <div className="items-center grid grid-cols-2 gap-2 sm:grids-cols-1 md:gap-3">
            <div className='grid grid-cols-2 content-start text-center justify-start'>
              <div className='pb-2 pt-1 '>
                <span className="pl-2 text-5xl font-bold text-rose-300 pb-5 md:text-6xl">{product.currency=="USD"?"$":"S/."}</span>
              </div> 
              <div className='pb-4'>
              <span className='text-6xl pl-3 font-bold text-rose-300 dark:text-black pt-2 md:text-7xl'>{product.price}</span>  
              </div>
            </div>  
            <div className='cart-icon content-end flex justify-end pr-3 md:pr-1 sm:pl-8 pb-4  '>
              <Link href={"/succes"}>
                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:text-red"><a className='cart-main'><AiOutlineShoppingCart></AiOutlineShoppingCart></a></a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Layout>
  )
}

export const getServerSideProps = async(context) =>{
    const {name} = context.query
    const {data:products} =await axios.get('http://Localhost:3000/api/categoriesList',{ params: { name: name } });
    return{
      props:{
        products,
      }
    }
  }

export default categories