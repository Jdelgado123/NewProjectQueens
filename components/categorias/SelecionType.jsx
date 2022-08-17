import React from 'react'
import Link from 'next/link'

const SelecionType = () => {
  return (
    <div className='grid gap-1 md:gap-6 grid-cols-1 md:grid-cols-1 mx-auto container'>
                <Link href={`/categorias/mujer`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Mujer</button>
                </Link>
                <Link href={`/categorias/hombre`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Hombre</button>
                </Link>
                <Link href={`/categories/peluches`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Peluches</button>
                </Link>
                <Link href={`/categorias/sexShop`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">SexShop</button>
                </Link>
                <Link href={`/categories/ofertas`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Ofertas</button>
                </Link>
                <Link href={`/categorias/unisex`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Unisex</button>
                </Link>
        </div>
  )
}

export default SelecionType