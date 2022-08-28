import React from 'react'
import { valorLocalhost } from '../../utils/globals'

function CreateNewPublic() {

  const create = async(e) =>{
    e.preventDefault()
    const fd = new FormData()

    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const files = document.querySelector('#img').files

    if (files.length !=0) {
      for(const file of files) {
        fd.append('imagen',file)
      }
      
    }
    fd.append('title',title),
    fd.append('description',description),

    fetch(`http://${valorLocalhost}:3000/newPublication`,{
      method:'POST',
      body:fd
    }).then(res => res.text()).catch(err => console.error(err))
    
    document.querySelector('#title').value = null
    document.querySelector('#description').value = null
    document.querySelector('#img').value = null

  }
  
  return (
    <div className='grid place-items-center'>
            <div className='w-full max-w-xs'>
                <form onSubmit={create} id='formPost' className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 grid gap-1">

                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Registro de nuevo Usuario</h5>

                    <label htmlFor="title" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Titulo</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="title" type="text" required />

                    <label htmlFor="description" className="block mb-2 text-sm text-gray-900 font-bold">Descripción</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    
                    <label htmlFor="img" className="block mb-2 text-sm text-gray-900 font-bold"/>
                    <input type="file" id="img" name="img" />

                    <div className='pt-6'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default CreateNewPublic