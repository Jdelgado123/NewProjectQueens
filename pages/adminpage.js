import Formproduct from '../components/admin/Formproduct'
import axios from "axios"
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

export const getServerSideProps = async(context) =>{
  const {data:category} =await axios.get('http://localhost:3000/api/categories');
  return{
    props:{
      category,
    }
  }
}
