import axios from "axios"
import Layout from "../components/Layout"
import Categorias from "../components/categorias/Categorias"
import {valorLocalhost} from "../utils/globals"

function Home ({categorias}) {
  return (
    <Layout>
      <div>
      <Categorias categorias={categorias}></Categorias>
      </div>
    </Layout>
    
  )
}

export const getServerSideProps = async(context) =>{
  const {data:categorias} =await axios.get(`http://${valorLocalhost}:3000/api/categories`);
  return{
    props:{
      categorias,
    }
  }
}

export default Home