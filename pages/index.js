import axios from "axios"
import {valorLocalhost} from "../utils/globals"


function Home () {
  return (
    <h1>Home</h1>
  )
}

export const getServerSideProps = async() =>{
  const {data} = await axios.get(`http://${valorLocalhost}:3000/api/home`)

  if(data.redirect == '/login'){
    return{
      redirect:{
        destination:'/login',
        permanent:false
      }
    }
  }

}

export default Home