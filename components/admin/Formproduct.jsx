import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Formproduct = ({category,sub_category}) => {

  const[product,setProduct]=useState({
    name:"",
    description:"",
    price:0,
    stock:0,
    barcode:"",
  })
  const [categor,setCategor] = useState("")
  const [file,setFile]=useState(null)
  const statefile = e => {
    setFile(e.target.files[0])
  }

  const preventEnter = () =>{
    var formPost = document.getElementById('formPost')

    formPost.addEventListener("keypress",function(e){
      if(e.key=="Enter"){
      e.preventDefault()
      }
    })
  }
  const statecategory = () =>{
    setCategor(document.getElementById('category').value)
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
    fd.append('category',categor)
    fetch(`http://192.168.0.8:3000/images/post`,{
      method:'POST',
      body:fd
    }).then(res => res.text()).catch(err => console.error(err))

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
    <div className='w-full max-w-xs'>
        <form id='formPost' onChange={preventEnter} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Producto:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="name" type="text" name='name' onChange={handleChange}/>
          <label htmlFor="description" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Descripción:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="description" type="text" name='description' rows="2"     onChange={handleChange}/>
          <label htmlFor="price" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Precio:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="price" type="number" name='price' onChange={handleChange}/>
          <label htmlFor="stock" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Cantidad:</label>
          <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="stock" type="number" name='stock'onChange={handleChange}/>
          <label htmlFor="category" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Categoria:</label>
          <select id="category" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" name="Categorias" onChange={statecategory}>
            {category.map((cat,index)=>(
              <option key={index} value={cat.id_category+""}>{cat.name}</option>
            ))}
          </select>
          
          <label htmlFor="barcode" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Codigo de barras:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="barcode" type="text" name='barcode' onChange={handleChange}/>
          <label htmlFor="imagen" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Imagen:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="img" type="file" name="img" onChange={statefile}/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear Producto</button>
        </form>
    </div>
  )
}

async function getSubcategories(id){
  const {data:subcategories} = axios.get('http://192.168.0.8:3000/api/subcategories')
  /*<select id="sub_category" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" name="Categorias" onChange={statecategory}>
            {sub_category.map((sub_catego,index)=>(
              <option key={index} value={sub_catego.id_category+""}>{sub_catego.name}</option>
            ))}
          </select>*/
}

export default Formproduct