import React from 'react'
import Link from 'next/link'


const Categorias = ({ categorias }) => {

    return (

        <div className='grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 mx-auto container'>

            {categorias.map((item) => (
                
                <Link href={`/categories/${item.name}`}>
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-outs"
                    >{item.name}</button>
                </Link>
                
            ))}

        </div>

    )
}

export default Categorias