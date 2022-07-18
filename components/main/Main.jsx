import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'


const Main = ({ products }) => {

  return (

    <div className='grid gap-6 grid-cols-1 md:grid-cols-3 items-center justify-between'>

      {products.map((product, index) => (
        <div key={index} className="border border-solid border-blue-700/100 max-w-sm bg-white rounded-lg shadow-xl">
          <div className='p-5 shadow-xl roundend-lg'>
            <div className='relative border-2 p-1 border-solid rounded-2xl border-rose-300  overflow-hidden'>
              <Link href={`/product/${product.id_product}`}>
                <Image className="pl-2 rounded-t-lg " src={"/imagesServer2/" + product.name_img.replace(/['"]+/g, '')} width={375} height={290} alt="product image" />
              </Link>
              {(product.stock == 0) ? <div className='absolute bottom-0 -mr-12 mb-4 rounded-br-lg right-0 bg-red-500 border-solid border-1 -rotate-45 whitespace-nowrap px-4 text-base w-36 h-8 text-center text-white'>AGOTADO</div> : null}
            </div>
          </div>
          <div className="pb-5 items-center justify-center content-center" >
            <Link href={`/product/${product.id_product}`}>
              <h2 className="text-xl text-center font-serif text-blue-700 dark:text-black">{product.name}</h2>
            </Link>
          </div>

        </div>
      ))}

      {products.map((product, index) => (
        <div className="flex justify-center" key={index}>
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
          <div className='relative border-2 p-1 border-solid rounded-2xl border-rose-300  overflow-hidden'>
              <Link href={`/product/${product.id_product}`}>
                <Image className="pl-2 rounded-t-lg " src={"/imagesServer2/" + product.name_img.replace(/['"]+/g, '')} width={375} height={290} alt="product image" />
              </Link>
              {(product.stock == 0) ? <div className='absolute bottom-0 -mr-12 mb-4 rounded-br-lg right-0 bg-red-500 border-solid border-1 -rotate-45 whitespace-nowrap px-4 text-base w-36 h-8 text-center text-white'>AGOTADO</div> : null}
            </div>
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2">{product.name}</h5>
              <p className="text-gray-700 text-base mb-4">
                {(product.currency == "USD") ? "$ " +product.price : "S/. "+ product.price}
              </p>
      
            </div>
          </div>
        </div>
      ))}


    </div>

  )
}

export default Main
