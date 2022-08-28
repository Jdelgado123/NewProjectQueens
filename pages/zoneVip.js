import React from 'react'
import Layout from '../components/Layout'
import Zonevip from '../components/vip/Zonevip'
import { valorLocalhost } from '../utils/globals'
import axios from 'axios'

function zoneVip({publications}) {
  return (
    <Layout>
        <Zonevip publications={publications}/>
    </Layout>
  )
}

export const getServerSideProps = async() =>{
    const {data:publications} = await axios.get(`http://${valorLocalhost}:3000/api/home/zonevip`)
  
    return{
        props:{
            publications
        }
    }  
}

export default zoneVip