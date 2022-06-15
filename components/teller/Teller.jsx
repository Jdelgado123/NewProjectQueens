import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const Teller = () => {

  const [dat, setDat] = useState(null)
  const [faa, setFaa] = useState(null)

  useEffect(() => {
    async function ga() {
      const { data } = await axios.get('/api/caja')
      console.log(data)
      setDat(data)
    }
    ga()
  }, [])

  const getRequires = async (id) => {
    const { data } = await axios.post('/api/requires', { id: id })
    setFaa(data)
  }

  const togleModal = async (id) => {
    const { data } = await axios.post('/api/requires', { id: id })
    setFaa(data)
    document.querySelector('#modal').classList.toggle('hidden')
  }
  return (
    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max w-max">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">SOLICITUDES DE COMPRA</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {(dat === null) ? null : dat.map((item, index) => (
            <li key={index} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    00{item.id_required}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.date_request}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {item.total_cost}
                </div>
                <div className="buttons">

                  <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button data-modal-toggle="extralarge-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => getRequires(item.id_required)}>Pagar</button>
                    <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => togleModal(item.id_required)}>Ver productos</button>
                  </div>
                </div>
              </div>

            </li>
          ))}

          <div id="modal" tabIndex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid">
            <div className='fixed inset-0 bg-gray-700 bg-opacity-70'></div>

            <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">

              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Extra Large modal
                  </h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={() => togleModal()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                </div>
                <div className='grid gap-6 grid-cols-1 md:grid-cols-3 items-center justify-between'>
                {(faa === null) ? null : faa.map((product, index) => (
                  <div key={index} className="border border-solid border-blue-700/100 max-w-sm bg-white rounded-lg shadow-xl">
                    <div className='p-5 shadow-xl roundend-lg'>
                      <div className='border-2 p-1 border-solid rounded-2xl border-yellow-400/100 items-center content-center justify-center object-center'>

                        <Image className="pl-2 rounded-t-lg " src={"/imagesServer2/" + product.name_img} width={275} height={190} alt="product image" />

                      </div>
                    </div>
                    <div className="pb-5 items-center justify-center content-center" >
                      
                      <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-black">{product.name.toUpperCase()}</h5>
                      
                    </div>
                    <div className="items-center grid grid-flow-col">
                      <div className='content-start text-start justify-start'>
                        <span className=" text-7xl font-bold text-red-600/100 pb-2 pl-10">{product.state == "USD" ? "$" : "S/."}<span className='text-7xl font-bold text-red-600/100 dark:text-black pb-2'>{product.price}</span></span>
                      </div>

                    </div>
                  </div>
                ))}
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                  <button data-modal-toggle="extralarge-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                  <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Teller