import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const Main = ({ products }) => {
  console.log(products)
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-3 items-center justify-between'>
    {products.map((product,index)=>(
      <div key={index} className="border-black border-2 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
      <Link href={`/product/${product.id_product}`}>
        <Image className="p-8 rounded-t-lg" src={"/imagesServer2/"+product.name_img} width={250} height={250} alt="product image" />
      </Link>
      <div className="px-5 pb-5 items-center justify-between" > 
      <Link href={`/product/${product.id_product}`  }>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name.toUpperCase()}</h5>
      </Link>
      </div>  
      <div className="cart-icon flex items-center"> 
        <span className="text-3xl font-bold text-gray-900 text-red pb-2 pl-10">S/<span className='text-5xl font-bold  text-gray-900 dark:text-white pb-2'>{product.price}</span></span>
        
        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><span><AiOutlineShoppingCart></AiOutlineShoppingCart></span></a>
      </div>
    </div>
    ))}
    </div>
    
  )
}

export default Main

/*
<div id="default-carousel" className="relative bg-black" data-carousel="static">
      <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
        <div className="duration-1 ease-in-out" data-carousel-item>
          <Image src={"/img/imagen1.jpg"} className=" block absolute  w-full" alt="..." height={650} width={1270} />
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image src={"/img/imagen1.jpg"} alt="..." layout='fill' />
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image src={"/img/imagen1.jpg"} alt="..." layout='fill' />
        </div>
      </div>

      <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
      </div>

      <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          <span className="hidden">Previous</span>
        </span>
      </button>
      <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="hidden">Next</span>
        </span>
      </button>
    </div>*/