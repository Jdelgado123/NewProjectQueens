import React from 'react'
import Link from 'next/link'
import axios from 'axios'

function Registernewuser() {


    const register = async(e) =>{
        

        const name = document.querySelector('#name').value
        const password = document.querySelector('#password').value

        const dataRegister = {name,password}

        await axios.post('api/newUser',dataRegister)

        

    }

    return (
        <div className='grid place-items-center'>
            <div className='w-full max-w-xs'>
                <form id='formPost' className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 grid gap-1">

                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Registro de nuevo Usuario</h5>

                    <label htmlFor="name" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Nombre:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="name" type="text" required />

                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    
                    <div className='pt-6'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=> register()}>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registernewuser