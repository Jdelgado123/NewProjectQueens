import React from 'react'
import Link from 'next/link'

const SelecionType = () => {
  return (
    <div className='grid gap-1 md:gap-6 grid-cols-1 md:grid-cols-1 mx-auto container'>
                <Link href={`/categorias/mujer`} >
<<<<<<< HEAD
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Lady`s</button>
                </Link>
                <Link href={`/categorias/hombre`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Daddy`s</button>
=======
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Ladies</button>
                </Link>
                <Link href={`/categorias/hombre`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Daddys</button>
>>>>>>> 1ee18efeec5cfbb1b6a5fdfed9ee428577ce4ff8
                </Link>
                <Link href={`/categories/peluches`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Toys</button>
                </Link>
                <Link href={`/categorias/sexShop`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">SexShop</button>
                </Link>
<<<<<<< HEAD
                <Link href={`/categories/ofertas`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Offers</button>
=======
                <Link href={`/ofertas`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Ofertas</button>
>>>>>>> 1ee18efeec5cfbb1b6a5fdfed9ee428577ce4ff8
                </Link>
                <Link href={`/categorias/unisex`} >
                    <button className="text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg">Home</button>
                </Link>
        </div>
  )
}

export default SelecionType