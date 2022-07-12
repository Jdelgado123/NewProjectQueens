/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";


function report() {

    const [arrayreport,setArrayreport] = useState(null)

    const getReport = async(dias) =>{
       const {data:reports} = await axios.get('/api/report',{params:{dias:dias}})

        setArrayreport(reports)
    }

    return (
        <Layout>
            <div className="relative rounded-xl overflow-auto">
                <div className="grid grid-cols-3 justify-between gap-3">
                    <div className=""><button onClick={()=>getReport(30)}>U. 30 dias</button></div>
                    <div className=""><button onClick={()=>getReport(7)}>U. 7 dias</button></div>
                    <div className=""><button onClick={()=>getReport(1)}>U. dia</button></div>
                </div>
                <div className="shadow-sm overflow-hidden my-8">
                {(arrayreport === null)?<div><h1>Seleccione la cantidad de dias del Reporte</h1></div>:<><div>
                        <table className="table-auto text-left w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Fecha</th>
                                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Total</th>

                                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrayreport.map((item, index) => (
                                    <tr className="hover:bg-grey-lighter" key={index}>
                                        <td className="py-4 px-6 border-b border-grey-light">{item.date_request}</td>
                                        <td className="py-4 px-6 border-b border-grey-light">{item.total_cost}</td>
                                        <td className="py-4 px-6 border-b border-grey-light">
                                            {item.state}
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