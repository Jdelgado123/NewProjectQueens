import React from 'react'
import {useEffect} from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import {runFireworks} from '../utils/confetti'


const succes = () => {

    useEffect(()=>{
        localStorage.clear()
        runFireworks()
    },[])

    return (
        <Layout>
        <div className='success-wrapper mx-auto min-h-screen place-content-center grid w-full'>
            <div className='bg-gray-400/100 mx-auto items-center place-content-center w-full flex justify-center flex-col p-12 rounded-lg gap-6'>
                <p className='icon'>
                    <BsBagCheckFill></BsBagCheckFill>
                </p>
                <h2>Gracias por comprar en Zaffari's</h2>
                <p className='email-msg'>Anote el numero de compra para que pueda pagar en caja <a className='text-red-500/100'>0014255</a></p>
                <p className='description'>Si no se realiza el pago dentro de los 30 min despues de ver esta pagina,<a className='text-red-500/100'> SE ELIMINARA SU PEDIDO</a></p>
                <Link href="/">
                    <button type='button' className='btn' width="300px" >Continuar Comprando</button>
                </Link>
            </div>
        </div>
        </Layout>
    )
}

export default succes