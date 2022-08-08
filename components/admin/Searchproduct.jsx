/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React from 'react'
import Navbar from '../navbar/Navbar'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Searchproduct = () => {

    const [datos, setDatos] = useState(null)
    const [faa, setFaa] = useState(null)
    const [numero, setNumero] = useState(0)
    const [see, setSee] = useState(false)


    useEffect(() => {
        async function de() {
            const { data } = await axios.post('/api/home', { name: "" })
            setDatos(data)
            setSee(false)
        }
        de()
    }, [see])

    const array = null
    const search = async () => {

        const name = document.querySelector('#input').value
        const { data } = await axios.post('/api/home', { name: name })
        
        numero == 0 ? document.querySelector('#section').classList.toggle('hidden') : null

        setDatos(data)
        
        setNumero(numero + 1)
    }

    const buttonEditar = async (id) => {
        const { data } = await axios.post('/api/updateProduct', { id: id })
       
        const ga = document.querySelector('#modal');
        ga.classList.toggle('hidden')
        document.querySelector('#name').value = (data === undefined) ? undefined : data[0].name
        document.querySelector('#stock').value = (data === null) ? undefined : data[0].stock
        document.querySelector('#price').value = (data === null) ? undefined : data[0].price
        document.querySelector('#description').value = (data === null) ? undefined : data[0].description
        setFaa(id)
    }

    const toggle = () => {
        const ga = document.querySelector('#modal');
        ga.classList.toggle('hidden')


    }
    const getEditProduct = async () => {
        const name = document.querySelector('#name').value
        const stock = document.querySelector('#stock').value
        const price = document.querySelector('#price').value
        const description = document.querySelector('#description').value
        const data = await axios.post('/api/getUpdateProduct', { id: faa, name: name, stock: stock, price: price, description: description })
        setSee(true)
        toggle()
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
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => buttonEditar(item.id_product)}>Editar</button>

                                            </div>
                                        </div>
                                    ))}
                                    <div id="modal" className="hidden py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 min-h-screen grid">
                                        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">

                                            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                                                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Modificar Producto</h1>
                                                <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                                                <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" ></input>

                                                <label htmlFor="price" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Precio</label>

                                                <input id="price" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" ></input>
                                                <label htmlFor="email2" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Cantidad</label>

                                                <input id="stock" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James"></input>
                                                <label htmlFor="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Descripción</label>
                                                <input id="description" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Descripción"></input>

                                                <div className="flex items-center justify-start w-full">
                                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={() => getEditProduct()}>GUARDAR</button>
                                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => toggle()}>CANCELAR</button>
                                                </div>
                                                <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => toggle()} role="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Searchproduct

/*
<div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">

                            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Modificar Producto</h1>
                                <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                                <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James">{(fa === null) ? null : fa[0].name}</input>

                                <label htmlFor="price" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Precio</label>

                                <input id="stock" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" >{(fa === null) ? null : fa[0].name}</input>
                                <label htmlFor="email2" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Cantidad</label>

                                <input id="description" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" >{(fa === null) ? null : fa[0].name}</input>
                                <label htmlFor="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Descripción</label>
                                <input id="description" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Descripción">{(fa === null) ? null : fa[0].name}</input>

                                <div className="flex items-center justify-start w-full">
                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">GUARDAR</button>
                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => buttonEditar(10)}>CANCELAR</button>
                                </div>
                                <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => buttonEditar(10)} role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>*/