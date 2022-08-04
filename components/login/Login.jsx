import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {useStateContext} from '../../context/StateContext'
import Link from 'next/link'
import Swal from 'sweetalert2'




const Login = () => {

  const {permissio,setPermissio} = useStateContext()
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    remember: false,
  })

  const stateRemember = () => {
    setCredentials({ ...credentials, remember: document.getElementById('remember').checked })
  }

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value })

  }

  const alert = ()=>{
    Swal.fire({
      icon: 'error',
      title: 'Usuario o Contraseña Incorrecta',
      text: 'Comunicarse con el administrador del sitio web si cree que es un error',
    })
    document.getElementById('username').value=""
    document.getElementById('password').value=""

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const {data:result} = await axios.post('/api/login', credentials)
    
    if(result.length<=0){
      alert()
    }else{
      setPermissio(result[0].state)
      result[0].state='High'?router.push('/admin'):router.push('/teller')
    }
  }


  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 place-content-center">
      <form className='space-y-6 place-content-center' onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Zaffari's Boutique</h5>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuario</label>
          <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} required />
        </div>
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" onChange={stateRemember}/>
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recordar Creedenciales</label>
          </div>
        </div>
        <Link href={"/seccion"}>
          <button type="text" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 self-center" onClick={()=>setPermissio('invitado')}>Entrar como Invitado</button>
        </Link>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>
      </form>
    </div>
  )
}

export default Login