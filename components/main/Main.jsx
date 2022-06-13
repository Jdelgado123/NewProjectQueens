import Image from 'next/image'
import React,{useState} from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Main = ({ products }) => {
  console.log(products)
  const [suma,setSuma] = useState("")

  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-3 items-center justify-between'>
      {products.map((product, index) => (
        <div key={index} className="border border-solid border-blue-700/100 max-w-sm bg-white rounded-lg shadow-xl">
          <div className='p-5 shadow-xl roundend-lg'>
          <div className='border-2 p-1 border-solid rounded-2xl border-yellow-400/100 items-center content-center justify-center object-center'>
            <Link href={`/product/${product.id_product}`}>
              <Image className="pl-2 rounded-t-lg " src={"/imagesServer2/" + product.name_img} width={375} height={290} alt="product image" />
            </Link>
          </div>
          </div>
          <div className="pb-5 items-center justify-center content-center" >
            <Link href={`/product/${product.id_product}`}>
              <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-black">{product.name.toUpperCase()}</h5>
            </Link> 
          </div>
          <div className="items-center grid grid-flow-col">
            <div className='content-start text-start justify-start'>
              <span className=" text-7xl font-bold text-red-600/100 pb-2 pl-10">{product.currency=="USD"?"$":"S/."}<span className='text-7xl font-bold text-red-600/100 dark:text-black pb-2'>{product.price}</span></span>
            </div>  
            <div className='cart-icon content-end flex justify-end pr-3'>
              <Link href={"/succes"}>
                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><a className='cart-main'><AiOutlineShoppingCart></AiOutlineShoppingCart></a></a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Main
