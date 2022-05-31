import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Formproduct = () => {

  const[product,setProduct]=useState({
    name:"",
    description:"",
    price:0,
    stock:0,
    barcode:"",
  })

  const [file,setFile]=useState(null)
  const statefile = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = e =>{
    e.preventDefault()
    const fd = new FormData()
    fd.append('imagen',file),
    fd.append('name',product.name),
    fd.append('description',product.description),
    fd.append('price',product.price),
    fd.append('stock',product.stock)
    fetch('http://localhost:3000/images/post',{
      method:'POST',
      body:fd
    }).then(res => res.json())
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
            <label htmlFor="barcode">Codigo de barras:</label>
            <input type="text" name='barcode' onChange={handleChange}/>
            <label htmlFor="imagen">Imagen:</label>
            <input type="file" name="img" onChange={statefile}/>
            <button>Crear Producto</button>
        </form>
    </div>
  )
}

export default Formproduct