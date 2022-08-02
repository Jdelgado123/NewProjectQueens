import axios from "axios"
import Main from "../components/main/Main"
import Layout from "../components/Layout"
import {valorLocalhost} from "../utils/globals"
import {useStateContext} from "../context/StateContext"
import {useRouter} from "next/router"
import {useEffect} from "react"


function Home ({products}) {
  const {permissio} = useStateContext()
  const router = useRouter()

  /*useEffect(() => {
    permissio == ""?router.push('/login'):console.log(permissio)
  }, [])*/

  return (
    <Layout>
      <div>
      <Main products={products}></Main>
      </div>
    </Layout>
    
  )
}

export const getServerSideProps = async(context) =>{
  const {data:products} =await axios.get(`http://${valorLocalhost}:3000/api/home`);
  return{
    props:{
      products,
    }
  }
}

export default Home