import Link from 'next/link'
import React from 'react'

const SelectOption = () => {
  return (
    <div className="px-3 md:lg:xl:px-40   border-t border-b py-20 bg-opacity-10">
            <div className="grid grid-cols-1 md:lg:xl:grid-cols-4 group bg-white shadow-xl shadow-neutral-100 border ">

                <Link href={'/adminpage'}>
                <div
                    className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                    <span className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Crear Nuevo Producto</p>
                    <p className="mt-2 text-sm text-slate-500">Cree nuevos productos o articulos para la Boutique</p>
                </div>
                </Link>

                <Link href={'/searchProduct'}>
                <div
                    className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                    <span className="p-5 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Editar Producto</p>
                    <p className="mt-2 text-sm text-slate-500">Busque los productos por Nombre o Numero de Serie</p>
                </div>
                </Link>

                <Link href={'/deleteProductjs'}>
                <div
                    className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                    <span className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-orange-200"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Eliminar Producto</p>
                    <p className="mt-2 text-sm text-slate-500">Elimine directamente los productos de la base de datos</p>
                </div>
                </Link>
                
                <Link href={'/report'}>
                <div className="p-10 flex flex-col items-center text-center group  md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                <span className="p-5 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-200"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Crear Reporte</p>
                    <p className="mt-2 text-sm text-slate-500">Vea y cree reportes del mismo dia o semanales</p>
                </div> 
                </Link>  
                <Link href={'/newuser'}>
                <div className="p-10 flex flex-col items-center text-center group  md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                <span className="p-5 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-200"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Publicacion Nueva</p>
                    <p className="mt-2 text-sm text-slate-500">Seccion para crear usuarios vip</p>
                </div> 
                </Link>
                <Link href={'/registernewuser'}>
                <div className="p-10 flex flex-col items-center text-center group  md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                <span className="p-5 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-200"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Crear Nuevo Usuario</p>
                    <p className="mt-2 text-sm text-slate-500">Seccion para crear usuarios vip</p>
                </div> 
                </Link>
            </div>

        </div>
  )
}

export default SelectOption