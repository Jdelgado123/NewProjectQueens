import Layout from "../components/Layout";
import axios from "axios";


function report({report}) {
    console.log(report)
    return (
        <Layout>
            <div className="relative rounded-xl overflow-auto">
                <div className="shadow-sm overflow-hidden my-8">
                <table className="table-auto text-left w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Fecha</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Total</th>

                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((item, index) => (
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
                </div>
                <a href="javascript:window.print()" className="text-slate-700">Imprimir</a>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const { data: report } = await axios.get('http://192.168.0.244:3000/api/report');
    return {
        props: {
            report,
        }
    }
}


export default report