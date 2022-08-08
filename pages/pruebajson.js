import React from 'react'
import db from '../config/db'
import Image from 'next/image'

export default function pruebajson ({result}) {
    const ff = "adadada"
    const tt = JSON.stringify(ff)
  return (
    <div>pruebajson
    {result.map((item,index)=>(<div key={index}><Image src={"/imagesServer2/"+item.json.replace(/['"]+/g, '')} width={300} height={300}></Image></div>))}
    </div>
  )
}

export const getServerSideProps = async(context) =>{
    const [result] = await db.query("SELECT *,JSON_EXTRACT(datosjson,'$.imagenes[0]') as json FROM aea")
    return {
        props:{
            result
        }
    }
  }