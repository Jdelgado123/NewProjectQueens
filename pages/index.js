import axios from "axios"
import Main from "../components/main/Main"

function Home ({products}) {
  return (
      <Main products={products}></Main>
  )
}

export const getServerSideProps = async(context) =>{
  const {data:products} =await axios.get('http://localhost:3000/api/home');
  return{
    props:{
      products,
    }
  }
}

export default Home