import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Ofertas from '../components/ofertas/Ofertas'
import {valorLocalhost} from '../utils/globals'

function ofertas({ofertas}) {
  return (
    <Layout>
        <Ofertas ofertas={ofertas}/>
    </Layout>
  )
}

export const getServerSideProps = async() =>{
    const {data:ofertas} = await axios.get(`http://${valorLocalhost}:3000/api/home/ofertas`)
  
    return{
        props:{
            ofertas
        }
    }  
}


export default ofertas