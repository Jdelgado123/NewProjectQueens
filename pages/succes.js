import React from 'react'
import {useEffect} from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import {runFireworks} from '../utils/confetti'
import { QRCodeSVG } from 'qrcode.react'

const succes = () => {

    useEffect(()=>{
        localStorage.clear()
        runFireworks()
    },[])

    return (
        <Layout>
        <div className='success-wrapper mx-auto min-h-screen place-content-center grid w-full'>
            <div className='bg-gray-400/100 mx-auto items-center place-content-center w-full flex justify-center flex-col px-80 rounded-lg gap-6'>
                <p className='icon'>
                    <BsBagCheckFill></BsBagCheckFill>
                </p>
                <h2>PEDIDO</h2>
                <div><QRCodeSVG value='001425558'></QRCodeSVG></div>
                <h1 className='text-red-500/100 text-4x1'>0014255</h1>
                <h2 className='description'>PASAR POR CAJA</h2  >
            </div>
        </div>
        </Layout>
    )
}

export default succes