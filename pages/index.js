import axios from "axios"
import Main from "../components/main/Main"

const Home = () => {
  return (
    
    <Main></Main>

  )
}

/*export const getServerSideProps = async(context) =>{
  const {data:products} =await axios.get('http://localhost:3000/')
  
  return{
    props:{
      products
    }
  }
}*/

export default Home