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
        <div className='success-wrapper mx-auto min-h-screen place-content-center bg-gray-400 grid w-full'>
            <div className='bg-gray-400 px-20 mx-auto items-center place-content-center w-full flex justify-center flex-col px-32s py-8 rounded-lg gap-6'>
                <h2 className='text-xl'>PASAR POR CAJA</h2>
                <div><QRCodeSVG size={200} value='0014255'></QRCodeSVG></div>
                <h1 className='text-red-500/100 text-5xl font-bold'>0014255</h1>
            </div>
        </div>
        </Layout>
    )
}

export default succes