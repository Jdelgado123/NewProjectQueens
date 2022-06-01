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
    fd.append('stock',product.stock),
    fd.append('barcode',product.barcode),
    fetch('http://192.168.100.3:3000/images/post',{
      method:'POST',
      body:fd
    }).then(res => res.text())

  document.getElementById('name').value = null
  document.getElementById('description').value = null
  document.getElementById('price').value = null
  document.getElementById('stock').value = null
  document.getElementById('barcode').value = null
  document.getElementById('img').value = null
  }
  const handleChange = ({target:{name,value}}) =>{
    setProduct({...product,[name]:value})
  }

  return (
    <div className='bg-gray-300'>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Producto:</label>
            <input id="name" type="text" name='name' onChange={handleChange}/>
            <label htmlFor="description">Descripción:</label>
            <input id="description" type="text" name='description' rows="2" onChange={handleChange}/>
            <label htmlFor="price">Precio:</label>
            <input id="price" type="number" name='price' onChange={handleChange}/>
            <label htmlFor="stock">Cantidad:</label>
            <input id="stock" type="number" name='stock'onChange={handleChange}/>
            <label htmlFor="barcode">Codigo de barras:</label>
            <input id="barcode" type="text" name='barcode' onChange={handleChange}/>
            <label htmlFor="imagen">Imagen:</label>
            <input id="img" type="file" name="img" onChange={statefile}/>
            <button>Crear Producto</button>
        </form>
    </div>
  )
}

export default Formproduct