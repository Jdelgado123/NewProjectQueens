import axios from 'axios'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { GiAmpleDress } from 'react-icons/gi'
import { ImPlus } from 'react-icons/im'
import { valorLocalhost } from '../../utils/globals'


const Formproduct = () => {
  const [categor, setCategor] = useState("")
  const [subcate, setSubcate] = useState("")
  const [file, setFile] = useState(null)
  const [aarray, setArray] = useState(null)
  const [currency, setCurrency] = useState("")
  const [tallass, setTallass] = useState(null)
  const [arraycategory, setArraycategory] = useState([])

  const tallas = []
  const SumatotalSize = 0
  useEffect(() => {
    async function fa() {
      const { data } = await axios.get('/api/subcategories', { params: { id: categor } })
      setArray(data)

    }
    fa()
  }, [categor])

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    location: "",
    barcode: "",
  })

  const getCategory = async () => {
    const { data: result } = await axios.get('/api/categories');
    setArraycategory(result)
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

  const stateCurrency = () => {
    setCurrency(document.getElementById('currency').value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    const files = document.querySelector('#img').files
    const stock = document.querySelector('#stock').value
    if (files.length != 0) {
      for (const singlefile of files) {
        fd.append('imagen', singlefile)
      }
    }
    fd.append('name', product.name),
      fd.append('description', product.description),
      fd.append('price', product.price),
      fd.append('stock', stock),
      fd.append('barcode', product.barcode),
      fd.append('category', categor),
      fd.append('subcategory', subcate),
      fd.append('location', product.location.toUpperCase()),
      fd.append('currency', currency)

    fd.append('sizes', JSON.stringify(tallass))


    fetch(`http://${valorLocalhost}:3000/images/post`, {
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
    document.getElementById('location').value = null
    document.getElementById('currency').value = 'PEN'
    document.getElementById('stock').removeAttribute("readOnly")
  }


  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value })
    if (name == "location") {
      console.log(document.getElementById('location').value = value.toUpperCase())
    }
  }

  const togleModal = () => {
    document.querySelector('#modal').classList.toggle('hidden')
  }
  
  const togleModalCreateCategoria = () => {
    document.querySelector('#modalCategorias').classList.toggle('hidden')
  }


  const pushSize = () => {
    const size_name = document.querySelector('#size_name')
    const size_stock = document.querySelector('#size_stock')

    const gg = { size_name: size_name.value, size_stock: size_stock.value }

    tallas.push(gg)

    toast.success("Talla agregada correctamente")

    size_name.value = ""
    size_stock.value = ""
  }

  function cambiarTallas(tallas) {
    setTallass(tallas)
  }

  function sumasizeStock() {
    const stock = 0
    const suma = 0
    const stockbysize = document.getElementById('stock')
    tallas.map((talla) => {
      suma = suma + stock + parseInt(talla.size_stock)
    })
    SumatotalSize = suma
    stockbysize.value = SumatotalSize
    cambiarTallas(tallas)
    togleModal()
    document.getElementById('stock').setAttribute("readOnly", "readOnly")
  }

  const CreateCategory = async () => {
    const category_name = document.querySelector('#category_name')
    const selectSeccion = document.querySelector('#selectSeccion')



    const dataCreate = { name: category_name.value, descripcion:selectSeccion.value }

    document.getElementById('selectSeccion').value = 'mujer'
    document.getElementById('category_name').value = null

    await axios.post('/api/categories', dataCreate)
  }



  return (
    <div className='w-full max-w-xs'>
      <form id='formPost' onChange={preventEnter} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 grid gap-1" onSubmit={handleSubmit}>

        <div className='grid grid-cols-2 justify-between'>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Creación de productos</h5>
          <div className='justify-end items-end grid'>
            <button type="button" className="w-4 text-2xl " onClick={() => togleModal()}><GiAmpleDress></GiAmpleDress></button>
          </div>
        </div>


        <div className='pt-4'>
          <div className='grid grid-cols-2'>
            <label htmlFor="category" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Categoria:</label>
            <div className='justify-center'>
              <button type="button" className="w-4 text-xs" onClick={() => togleModalCreateCategoria()}><ImPlus></ImPlus></button>
            </div>
          </div>
          <select id="category" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" name="Categorias" onChange={statecategory} onClick={() => getCategory()}>
            <option value="null">Seleccione categoria</option>
            {arraycategory.map((cat, index) => (
              <option key={index} value={cat.id_category}>{cat.name}</option>
            ))}
          </select>
        </div>

        <label htmlFor="name" className="block text-gray-700 dark:text-white text-sm font-bold mb-2 pt-6">Nombre:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="name" type="text" name='name' onChange={handleChange} required />
        <label htmlFor="description" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Descripción:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="description" type="text" name='description' rows="2" onChange={handleChange} />

        <div className='grid grid-cols-2 justify-between'>
          <div>
            <label htmlFor="price" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Precio:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="price" type="number" name='price' onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Moneda:</label>
            <select name="currency" id="currency" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white' onChange={stateCurrency} required>
              <option value="PEN">Soles</option>
              <option value="USD">Dolares</option>
            </select>
          </div>
        </div>

        <div id="modalCategorias" tabIndex="-1" className="hidden overflow-y-auto overflow-x-visible fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid">

          <div className='fixed inset-0 bg-gray-700 bg-opacity-70'></div>

          <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Crear Categoria
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={() => togleModalCreateCategoria()}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <div>
                <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">
                      Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category_name" type="text" placeholder="Nombre de la categoria" required />

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">
                      Seleccione Seccion
                    </label>

                    <select name="selectSeccion" id="selectSeccion" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white' required>
                      <option value="mujer">Mujer</option>
                      <option value="hombre">Hombre</option>
                      <option value="sexShop">SexShop</option>
                      <option value="unisex">Unisex</option>
                    </select>

                  </div>


                  <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => CreateCategory()}>
                      Crear
                    </button>
                    <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => togleModalCreateCategoria()} >Cancelar</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div id="modal" tabIndex="-1" className="hidden overflow-y-auto overflow-x-visible fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full place-content-center min-h-screen grid">
          <div><Toaster></Toaster></div>
          <div className='fixed inset-0 bg-gray-700 bg-opacity-70'></div>

          <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Agregar Talla
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={() => togleModal()}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Talla
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="size_name" type="text" placeholder="example:M" required />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                      Cantidad
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="size_stock" type="number" required />
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => pushSize()}>
                      Agregar
                    </button>
                    <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => sumasizeStock()} >Calcular Cantidad</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <label htmlFor="stock" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Cantidad:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="stock" type="number" name='stock' onChange={handleChange} required />



        <label htmlFor="barcode" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Codigo de barras:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="barcode" type="text" name='barcode' onChange={handleChange} />

        <label htmlFor="location" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Ubicación:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" id="location" type="text" name='location' onChange={handleChange} placeholder="Ubicación" />

        <label htmlFor="imagen" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Imagen:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white" multiple id="img" type="file" name="img" required />
        <div id='previewImage' className="block text-gray-700 dark:text-white text-sm font-bold mb-2"></div>
        <div className='pt-6'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear Producto</button>
        </div>
      </form>
    </div>
  )
}

export default Formproduct

