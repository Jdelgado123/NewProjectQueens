import Formproduct from '../components/admin/Formproduct'
import Layout from "../components/Layout"


export default function adminpage() {
  return (
    <Layout>
    <div className='grid place-items-center'>
      <Formproduct/>
    </div>
    </Layout>
  )
}

