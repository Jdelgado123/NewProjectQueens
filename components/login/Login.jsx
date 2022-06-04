import React from 'react'
import {useState} from 'react'
import axios from 'axios'

function Login() {
    const [credentials,setCredentials] = useState({
        username: '',
        password: '',
        remember: '',
    })

    const handleChange = ({target:{name,value}}) => {
        setCredentials({...credentials,[name]:value})
        
    }

    const stateRemember = ()=>{
        setCredentials({...credentials,remember: document.getElementById('remember').checked})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const res =  await axios.post('/api/hello',{body:credentials})
        console.log(res)
    }

  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Ingrese sus Creedenciales</h5>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuario</label>
            <input type="text" name="username" onChange={handleChange} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jean Pierre" required/>
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
            <input type="password" name="password" onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
        </div>
        <div className="flex items-start">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" name="remember" onClick={stateRemember} className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                </div>
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recordar Creedenciales</label>
            </div>
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            No registrado? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Crear cuenta</a>
        </div>
    </form>
</div>
  )
}



export default Login