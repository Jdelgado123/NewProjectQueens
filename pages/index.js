import axios from "axios"
import Main from "../components/main/Main"
import Layout from "../components/Layout"

function Home ({products}) {
  return (
    <Layout>
      <div>
      <Main products={products}></Main>
      </div>
    </Layout>
    
  )
}

export const getServerSideProps = async(context) =>{
  const {data:products} =await axios.get('http://192.168.0.8:3000/api/home');
  return{
    props:{
      products,
    }
  }
}

export default Home