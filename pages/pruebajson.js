import React from 'react'
import db from '../config/db'

export default function pruebajson ({result}) {
    const ga =JSON.parse(result[0].json)
    console.log(ga[0])
  return (
    <div>pruebajson</div>
  )
}

export const getServerSideProps = async(context) =>{
    const [result] = await db.query("SELECT nombre, JSON_EXTRACT(datosjson,'$.imagenes') as json FROM aea")
    return {
        props:{
            result
        }
    }
  }