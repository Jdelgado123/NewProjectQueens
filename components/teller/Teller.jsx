import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'


const Teller = () => {

  const [dat,setDat] = useState(null)
  const [faa,setFaa] = useState(null)

  useEffect(()=>{
    async function ga(){
      const {data} = await axios.get('/api/caja')
      console.log(data) 
      setDat(data)
    } 
    ga()
  },[])

  const getRequires = async(id)=>{
    const {data} = await axios.post('/api/requires',{id:id})
    setFaa(data)
  }

  console.log(faa)
  return (
    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max w-max">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">SOLICITUDES DE COMPRA</h5>
    </div>
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {(dat===null)?null:dat.map((item,index)=>(
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
              <button type="button" className="buy-now" onClick={()=>getRequires(item.id_required)}>
                PAGADO
              </button>
            </div>
          </div>
          
        </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default Teller