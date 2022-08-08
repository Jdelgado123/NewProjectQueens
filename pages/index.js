import axios from "axios"
import Main from "../components/main/Main"
import Layout from "../components/Layout"
import {valorLocalhost} from "../utils/globals"
import {useStateContext} from "../context/StateContext"
import {useRouter} from "next/router"


function Home () {
  const {permissio} = useStateContext()
  const router = useRouter()

  /*useEffect(() => {
    permissio == ""?router.push('/login'):console.log(permissio)
  }, [])*/

  return (
    <Layout>
      <div>
      
      </div>
    </Layout>
    
  )
}

export const getServerSideProps = async(context) =>{
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