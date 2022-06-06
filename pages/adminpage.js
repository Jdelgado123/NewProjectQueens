import Formproduct from '../components/admin/Formproduct'
import axios from "axios"

export default function adminpage({category}) {
  return (
    <div className='grid place-items-center'>
      <Formproduct category={category}/>
    </div>
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
