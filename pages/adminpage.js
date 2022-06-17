import Formproduct from '../components/admin/Formproduct'
import axios from "axios"
import Layout from "../components/Layout"

export default function adminpage({category}) {
  return (
    <Layout>
    <div className='grid place-items-center'>
      <Formproduct category={category}/>
    </div>
    </Layout>
  )
}

export const getServerSideProps = async(context) =>{
  const {data:category} =await axios.get('http://192.168.0.8:3000/api/categories');
  return{
    props:{
      category,
    }
  }
}
