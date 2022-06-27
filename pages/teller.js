import React from 'react'
import Layout from '../components/Layout'
import Teller from '../components/teller/Teller'
import Image from 'next/image'

const teller = () => {
    return (

        
        <Layout>
            <div className='place-content-center grid  shrink-0 w-full'>
            <Teller></Teller>
            </div>
        </Layout>

    )
}

export default teller