/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";


function report() {

    const [arrayreport, setArrayreport] = useState(null)

    const getReport = async (dias) => {
        const { data: reports } = await axios.get('/api/report', { params: { dias: dias } })

        setArrayreport(reports)
    }

    return (
        <Layout>
            <div className="relative rounded-xl overflow-auto">
                <div className="grid grid-cols-1 mx-4 gap-6 mt-2 lg:grid-cols-3">
                    <div className="flex items-center justify-between px-8 py-2 border border-solid cursor-pointer rounded-xl dark:border-gray-700" onClick={()=> getReport(30)}>
                        <div className="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>

                            <h2 className="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-200">Seleccionar</h2>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-500 sm:text-3xl dark:text-gray-300">30 dias</h2>
                    </div>

                    <div className="flex items-center justify-between px-8 py-2 border border-solid border-blue-500 cursor-pointer rounded-xl" onClick={()=> getReport(7)}>
                        <div className="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600 dark:text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>

                            <h2 className="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-200">Seleccionar</h2>
                        </div>


                        <div className="flex flex-col items-center space-y-1">
                            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-500 sm:text-3xl">7 dias</h2>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-8 py-2 border border-solid cursor-pointer rounded-xl dark:border-gray-700" onClick={()=> getReport(1)}>
                        <div className="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>

                            <h2 className="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-200">Seleccionar</h2>
                        </div>

                        <div className="flex flex-col items-center space-y-1">
                            <h2 className="text-2xl font-semibold text-gray-500 sm:text-3xl dark:text-gray-300">1 dia</h2>
                        </div>
                    </div>
                </div>
                <div className="shadow-sm overflow-hidden my-8">
                    {(arrayreport === null) ? <div><h1>Seleccione la cantidad de dias del Reporte</h1></div> : <><div>
                        <table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Fecha
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Metodo
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Descuento
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrayreport.map((item, index) => (
                                    <tr className="bg-gray-100 border-b" key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">{item.date_request}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.state}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.discount}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.total_cost}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div><a href="javascript:window.print()" className="text-slate-700">Imprimir</a></>
                    }
                </div>
            </div>
        </Layout>
    )
}


export default report