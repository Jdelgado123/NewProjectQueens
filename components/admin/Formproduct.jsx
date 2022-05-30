import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Formproduct = () => {

  const[product,setProduct]=useState({
    name:"",
    description:"",
    price:0,
    stock:0,
    img:""
  })
  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log("Creating a product")
    await axios.post('/api/products',product)
  }

  const handleChange = ({target:{name,value}}) =>{
    setProduct({...product,[name]:value})
  }

  return (
    <div className='bg-gray-300'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Producto:</label>
            <input type="text" name='name' onChange={handleChange}/>
            <label htmlFor="description">Descripción:</label>
            <input type="text" name='description' rows="2" onChange={handleChange}/>
            <label htmlFor="price">Precio:</label>
            <input type="number" name='price' onChange={handleChange}/>
            <label htmlFor="stock">Cantidad:</label>
            <input type="number" name='stock'onChange={handleChange}/>
            <label htmlFor="imagen">Imagen:</label>
            <input type="file" name="img" onChange={handleChange}/>
            <button>Crear Producto</button>
        </form>
    </div>
  )
}

export default Formproduct