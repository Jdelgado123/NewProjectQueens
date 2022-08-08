import axios from 'axios'
import React from 'react'
import Navbar from '../navbar/Navbar'
import { useState,useEffect } from 'react'
import Image from 'next/image'

const DeleteProduct = () => {

    const [datos, setDatos] = useState(null)
    const [faa, setFaa] = useState(null)
    const [numero, setNumero] = useState(0)
    const [see,setSee] = useState(false)


    useEffect(()=>{
        async function de(){
            const { data } = await axios.post('/api/home', { name: "" })
            setDatos(data)
            setSee(false)
        }
        de()
    },[see])


    const search = async () => {

        const name = document.querySelector('#input').value
        const { data } = await axios.post('/api/home', { name: name })
        
        numero == 0 ? document.querySelector('#section').classList.toggle('hidden') : null

        setDatos(data)
        
        setNumero(numero + 1)
    }

    const Delete = async(id) =>{
        const {data} = await axios.post('/api/productDelete',{id:id})
        
        setSee(true)
    }

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="grid h-full w-full justify-center container mx-auto px-8">
                    <div className="text-center pt-24">
                        <h1 className="text-3xl sm:text-5xl tracking-widest text-black lg:text-7xl">Busca el Producto</h1>

                        <div className="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                            <input id="input" type="text" className="rounded-md border border-rose-400 border-solid bg-dark/60 px-4 py-2 text-black placeholder-blue-300 backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 sm:mx-2" placeholder="Example" />

                            <button className="transform rounded-md bg-blue-700 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2" onClick={() => search()}>Buscar</button>
                        </div>
                    </div>
                    <div id='section' className='hidden'>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="mx-auto">
                                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">

                                    {(datos === null) ? null : datos.map((item, index) => (
                                        <div className="flex flex-col items-center p-8 transition-colors duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-xl" key={index}>
                                            <Image src={'/imagesServer2/' + item.name_img.replace(/['"]+/g, '')} className="object-cover aspect-video w-32 h-32 rounded-full ring-4 ring-gray-300" alt="..." width={450} height={450} objectFit='cover' />

                                            <h1 className="mt-4 text-2xl font-serif text-gray-700 capitalize dark:text-white group-hover:text-white">{item.name}</h1>

                                            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{item.stock}</p>
                                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                                <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800" onClick={() => Delete(item.id_product)}>Eliminar</button>
                                                
                                            </div>
                                        </div>
                                    ))}
                                    

                                </div>
                            </div>
                        </section>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default DeleteProduct