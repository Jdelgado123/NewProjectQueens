import React from 'react'
import Layout from '../components/Layout'
import Teller from '../components/teller/Teller'

const teller = () => {
    return (
        <Layout>
            <div className='place-content-center grid w-full'>
            <Teller></Teller>
            </div>
        </Layout>

    )
}

export default teller