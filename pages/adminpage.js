import Formproduct from '../components/admin/Formproduct'
import axios from "axios"

export default function adminpage({category}) {
  return (
    <div>
      <Formproduct category={category}/>
    </div>
  )
}

export const getServerSideProps = async(context) =>{
  const {data:category} =await axios.get('http://192.168.100.3:3000/api/categories');
  return{
    props:{
      category,
    }
  }
}
