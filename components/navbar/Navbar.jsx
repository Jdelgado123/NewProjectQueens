import Link from 'next/link'
import React,{useEffect,useState} from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../../context/StateContext'
import Cart from '../cart/Cart'


const Navbar = () => {

  const [role,setRole] = useState("in")

  const { showCart, setShowCart, totalQuantities, permissio, setPermissio } = useStateContext();
  const aea = () => {
    document.querySelector('#menu').classList.toggle('hidden')
  }

  

  useEffect(() => {
    setRole(localStorage.getItem('role'))
  }, [])


  const cleanpermissio = () => {
    localStorage.clear()
    setPermissio("")
  }

  return (
    <nav className=" bg-black border-gray-200 px-2 sm:px-5 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href={"/seccion"}>
          <a href="#" className="items-center left-0">
            <span className=" text-xl font-semibold whitespace-nowrap dark:text-white text-white">Zaffaris Boutique</span>
          </a>
        </Link>
        <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false" onClick={() => aea()}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <div id='menu' data-collapse-toggle="mobile-menu" className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">

            {role == "High" ?
              <div>
                <Link href={"/admin"}>
                  <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>Admin</span>
                  </button>
                </Link>

                <Link href={"/teller"}>
                  <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>Caja</span>
                  </button>
                </Link>

                <Link href={"/seccion"}>
                  <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>Secciones</span>
                  </button>
                </Link>
              </div>

              : undefined}


            {role == "Low" ?
              <div>
                <Link href={"/teller"}>
                  <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>Caja</span>
                  </button>
                </Link>

                <Link href={"/seccion"}>
                  <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>Secciones</span>
                  </button>
                </Link>
              </div>
              :
              undefined
            }

            {role == "invitado" ?
              <Link href={"/seccion"}>
                <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <span>Secciones</span>
                </button>
              </Link>
              :
              undefined}


            <Link href={"/login"}>
              <button className="flex flex-row text-white bg-black items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" onClick={() => cleanpermissio()}>
                <span>Login</span>
              </button>
            </Link>

            <div className='flex flex-row'>
              <button type='button' className='cart-icon' onClick={() => {
                setShowCart(true)
              }}>
                <AiOutlineShopping></AiOutlineShopping>
                <span className='cart-item-qty top-0'>{totalQuantities}</span>
              </button>
            </div>
            {showCart && <Cart></Cart>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar