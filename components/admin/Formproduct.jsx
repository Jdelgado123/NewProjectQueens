import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'


const Formproduct = ({ category }) => {
  const [categor, setCategor] = useState("")
  const [subcate,setSubcate] = useState("")
  const [file, setFile] = useState(null)
  const [aarray,setArray] = useState(null)

  useEffect(()=>{
    async function fa(){
      const {data} = await axios.get('/api/subcategories',{params:{id:categor}})
      setArray(data)
    }
    fa()
  },[categor])
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    location:"",
    barcode: "",
  })
  
  const statefile = e => {
    setFile(e.target.files[0])
  }

  const preventEnter = () => {
    var formPost = document.getElementById('formPost')

    formPost.addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        e.preventDefault()
      }
    })
  }
  const statecategory = () => {
    setCategor(document.getElementById('category').value)
  }

  const stateSubcategory=()=>{
    setSubcate(document.getElementById('sub_category').value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('imagen', file),
      fd.append('name', product.name),
      fd.append('description', product.description),
      fd.append('price', product.price),
      fd.append('stock', product.stock),
      fd.append('barcode', product.barcode),
      fd.append('category', categor),
      fd.append('subcategory',subcate),
      fd.append('location',product.location)
    fetch(`http://localhost:3000/images/post`, {
      method: 'POST',
      body: fd
    }).then(res => res.text()).catch(err => console.error(err))

    document.getElementById('name').value = null
    document.getElementById('description').value = null
    document.getElementById('price').value = null
    document.getElementById('stock').value = null
    document.getElementById('barcode').value = null
    document.getElementById('img').value = null
    document.getElementById('category').value = null
    document.getElementById('sub_category').value = null
  }
  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value })
  }

  return (
    <div className='w-full max-w-xs'>
      <form id='formPost' onChange={preventEnter} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Creacion de productos</h5>
        <label htmlFor="name" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Producto:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="name" type="text" name='name' onChange={handleChange} />
        <label htmlFor="description" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Descripción:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="description" type="text" name='description' rows="2" onChange={handleChange} />
        <label htmlFor="price" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Precio:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="price" type="number" name='price' onChange={handleChange} />
        <label htmlFor="stock" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Cantidad:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="stock" type="number" name='stock' onChange={handleChange} />
        <label htmlFor="category" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Categoria:</label>
        <select id="category" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" name="Categorias" onChange={statecategory}>
          <option value="null">Seleccione categoria</option>
          {category.map((cat, index) => (
            <option key={index} value={cat.id_category}>{cat.name}</option>
          ))}
        </select>
        
        <label htmlFor="category" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Subcategory:</label>
        <select id="sub_category" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" name="Subcategorias" onChange={stateSubcategory}>
          <option value="null">Seleccione la subcategoria</option>
          {(aarray===null)? null :aarray.map((valor,index)=>(
            <option key={index} value={valor.id_subcategory}>{valor.name}</option>
          ))}
        </select>
        <label htmlFor="barcode" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Codigo de barras:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="barcode" type="text" name='barcode' onChange={handleChange} />
        
        <label htmlFor="location" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Ubicación:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="location" type="text" name='location' onChange={handleChange} />
        
        <label htmlFor="imagen" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Imagen:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="img" type="file" name="img" onChange={statefile} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear Producto</button>
      </form>
    </div>
  )
}

export default Formproduct