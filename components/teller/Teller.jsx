import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { BsCashStack, BsGiftFill } from 'react-icons/bs'
import { MdCardGiftcard } from 'react-icons/md'
import { RiVisaFill } from 'react-icons/ri'
import { GiPayMoney } from 'react-icons/gi'
import { BiSearchAlt } from 'react-icons/bi'


const Teller = () => {

  const [dat, setDat] = useState([])
  const [faa, setFaa] = useState(null)
  const [state, setState] = useState(false)
  const [costTotal, setCostTotal] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [loansdates, setLoansdates] = useState({})
  const [method, setMethod] = useState("")

  useEffect(() => {
    async function ga() {
      const { data } = await axios.get('/api/requires')
      console.log(data)
      setDat(data)
    }
    ga()
  }, [])

  useEffect(() => {
    async function da() {
      const { data } = await axios.get('/api/requires')
      setDat(data)
      setState(false)
    }
    da()
  }, [state])

  const requiredCancel = async (id, state) => {
    await axios.put('/api/requires', { id: id, state: state })
    setState(true)

  }

  const togleModal = async (id) => {
    const { data } = await axios.post('/api/requires', { id: id })
    setFaa(data)
    setCostTotal(data[0].total_cost)
    togleModalx()
  }

  const togleModalx = () => {
    document.querySelector('#modal').classList.toggle('hidden')
    setDiscount(0)
    setLoansdates({})
    setMethod("")
  }

  const readythepay = async () => {

    const costPay = costTotal - discount

    await axios.put('/api/requires', { id: faa[0].id_required, state: "pagado", method: method, total_cost: costPay ,discount:discount })

    setState(true)

  }

  const declareMethod = (x) =>{
    
    if (x == 'free') {
      setMethod(x)
      document.querySelector('#modalFree').classList.toggle('hidden')
    } if (x == 'loan') {
      setMethod(x)
      document.querySelector('#modalLoan').classList.toggle('hidden')
    } if(x == 'giftcard') {
      document.querySelector('#lending').classList.toggle('hidden')
    } if(x == 'efectivo' || x == 'tarjeta'){
      setMethod(x)
    }
    
  }

  const toglelending = (x) => {

    if (x == 'free') {
      document.querySelector('#modalFree').classList.toggle('hidden')
    } if (x == 'loan') {
      document.querySelector('#modalLoan').classList.toggle('hidden')
    } if(x == 'giftcard') {
      document.querySelector('#lending').classList.toggle('hidden')
    }
  }

  const applyDiscount = () => {
    setDiscount(document.querySelector('#discount').value)
  }

  const searchLoan = async () => {
    let loanDni = document.querySelector('#loanDni').value

    const { data } = await axios.get('api/teller', { params: { dni: loanDni } })

    if (data.length > 0) {
      document.querySelector('#loanName').value = data[0].name
    } else {
      toast.error("Numero DNI no existente en la base e datos",{duration:1500})
      document.querySelector('#loanName').value = ""
    }
  }

  const NewLoan = () =>{
    let loanName = document.querySelector('#loanName').value
    let loanDni = document.querySelector('#loanDni').value
    setLoansdates({name:loanName,dni:loanDni})
  }

  return (

    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max w-max">
      <div><Toaster position="bottom-right"
        reverseOrder={false}
      /></div>
      {(dat.length <= 0) ? <div className="place-content-center min-h-max grid w-full"><h2 className="font-size:14px;font-weight:normal;line-height:inherit;margin:0;padding:0">No se a generado ninguna solicitud o todas estan completadas</h2></div> :
        <><div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">SOLICITUDES DE COMPRA</h5>
        </div><div className="flow-root">

            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {dat.map((item, index) => (
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
                        <button data-modal-toggle="extralarge-modal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => requiredCancel(item.id_required, "cancelado")}>Eliminar</button>
                        <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={() => togleModal(item.id_required)}>Ver productos</button>
                      </div>
                    </div>
                  </div>

                </li>
              ))}

              <div id="lending" className="fixed hidden overflow-y-auto overflow-x-visible top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid backdrop-blur">

                <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">

                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Aplicar Descuento
                      </h3>
                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={() => toglelending('giftcard')}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      </button>
                    </div>

                    <div>
                      <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">
                            Descuento
                          </label>

                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="discount" type="number" required />

                        </div>


                        <div className="flex items-center justify-between">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => applyDiscount()}>
                            Crear
                          </button>
                          <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => toglelending('giftcard')} >Cancelar</button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div id="modalFree" className="fixed hidden overflow-y-auto overflow-x-visible top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid backdrop-blur">

                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal" onClick={() => toglelending('free')}>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Poner los productos en la solicitud como Gratuitos?</h3>
                      <button data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => readythepay('free')}>
                        Si, Estoy seguro
                      </button>
                      <button data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => toglelending('free')}>No, cancel</button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="modalLoan" className="fixed hidden overflow-y-auto overflow-x-visible top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid backdrop-blur">

                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal" onClick={() => toglelending('loan')}>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Estas en Loan Modal</span>
                    </button>
                    <div>
                      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            DNI
                          </label>
                          <div className='grid grid-cols-2'>
                            <input className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="loanDni" type="text" placeholder="123456789" required />
                            <button type="button" className="text-xl" onClick={() => searchLoan()}><i><BiSearchAlt className='display-block m-auto' /></i></button>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                            Nombre
                          </label>
                          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="loanName" type="text" required />
                        </div>
                        <div className="flex items-center justify-between">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => NewLoan()}>
                            Agregar
                          </button>
                          <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => toglelending('loan')} >Cancelar</button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div id="modal" className="fixed grid hidden overflow-y-auto overflow-x-visible top-0 right-0 left-0 z-30 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen">
                <div className='fixed inset-0 bg-gray-700 bg-opacity-70'></div>

                <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">

                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Pedido
                      </h3>
                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={() => togleModalx()}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      </button>
                    </div>

                    <div className="not-prose relative bg-slate-50 rounded-xl overflow-x-scroll dark:bg-slate-800/25"><div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div><div className="relative rounded-xl overflow-auto">


                      <div className='relative rounded-xl overflow-auto p-8'>
                        <div className='flex items-center gap-2 p-2'>
                          <div className="overflow-y-auto h-72 relative max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y">

                            {(faa === null) ? null : faa.map((product, index) => (
                              <div className="flex items-center gap-4 p-4" key={index}>
                                <Image src={'/imagesServer2/' + product.name_img.replace(/['"]+/g, '')} width={400} height={400} alt="..." objectFit="revert" className='aspect-video object-cover' />
                                <div className="flex flex-col">
                                  <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{product.name}</strong>
                                  <div className='flex items-center gap-2 w-52'>
                                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">Ubicacion: {product.location}</span>
                                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">Precio: {product.price}</span>
                                  </div>

                                </div>
                              </div>
                            ))}

                          </div>
                          <div className='overflow-y-auto h-72 relative max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl divide-y items-center'>
                            <ul role="list" className="[&>*]:p-4 [&>*]:bg-white [&>*]:rounded-lg [&>*]:shadow space-y-4">
                              <table className="text-left w-full border-collapse">
                                <thead>
                                  <tr>
                                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Producto</th>
                                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Precio</th>

                                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Cantidad</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(faa === null) ? null : faa.map((product, index) => (
                                    <tr className="hover:bg-grey-lighter" key={index}>
                                      <td className="py-4 px-6 border-b border-grey-light">{product.name}</td>
                                      <td className="py-4 px-6 border-b border-grey-light">{product.price}</td>
                                      <td className="py-4 px-6 border-b border-grey-light text-center">
                                        {product.stock}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              {discount == 0 ? undefined : <h3 className="pl-6">Descuento: <i className='text-red-500'>{discount}.00</i> - <i>{costTotal}</i> </h3>}
                              
                              {Object.entries(loansdates).length === 0 ? undefined:<h3 className='pl-6'>Credito a DNI:<i className='text-red-500'>{loansdates.dni}</i></h3>}

                              {method == ''? undefined : <h3 className='pl-6'> Metodo de pago:<i className='text-red-500'> {method}</i></h3>}
                            </ul>
                          </div>

                        </div>
                      </div>
                      <div className='flex p-2'>
                        <div className='absolute bottom-0 right-10 text-center grid grid-cols-2'>
                          <h3 className='text-3xl font-bold text-red-800'>TOTAL:</h3>
                          <h3 className='text-3xl'>{discount == 0 ? costTotal : costTotal - discount}</h3>
                        </div>
                      </div>

                    </div><div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div></div>

                    <div className="flex p-4 gap-0 rounded-b border-t border-gray-200 dark:border-gray-600">
                      <button className="text-indigo-100 text-3xl transition-colors duration-150 bg-blue-700 rounded-lg hover:bg-indigo-800 h-10 px-6 m-2" onClick={() => declareMethod('tarjeta')}><RiVisaFill /></button>
                      <button className="text-indigo-100 text-3xl transition-colors duration-150 bg-blue-700 rounded-lg hover:bg-indigo-800 h-10 px-6 m-2" onClick={() => declareMethod('efectivo')}><BsCashStack /></button>
                      <button className="text-indigo-100 text-3xl transition-colors duration-150 bg-blue-700 rounded-lg hover:bg-indigo-800 h-10 px-6 m-2" onClick={() => declareMethod('giftcard')}><MdCardGiftcard /></button>
                      <button className="text-indigo-100 text-2xl transition-colors duration-150 bg-blue-700 rounded-lg hover:bg-indigo-800 h-10 px-6 m-2" onClick={() => declareMethod('free')}><BsGiftFill /></button>
                      <button className="text-indigo-100 text-2xl transition-colors duration-150 bg-blue-700 rounded-lg hover:bg-indigo-800 h-10 px-6 m-2" onClick={() => declareMethod('loan')}><GiPayMoney /></button>
                      <button className="absolute right-8 text-white transition-colors duration-150 bg-blue-700 rounded-lg hover:bg-indigo-800 h-10 px-6 m-2" onClick={() => readythepay()}>Pagar</button>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div></>
      }
    </div>
  )
}

export default Teller