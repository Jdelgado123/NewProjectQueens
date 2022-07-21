import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { valorLocalhost } from '../../utils/globals'

const categories = ({ products }) => {



  return (
    <Layout>
      <div className='grid gap-1 md:gap-6 grid-cols-3 md:grid-cols-4'>

        {products.map((product, index) => (
          <div key={index} className="max-w-sm bg-white shadow-xl">

          <div className='relative overflow-hidden'>
            <Link href={`/product/${product.id_product}`}>
              <Image src={"/imagesServer2/" + product.name_img.replace(/['"]+/g, '')} width={375} height={325} alt="product image" />
            </Link>
            {(product.stock == 0) ? <div className='absolute bottom-0 -mr-12 mb-4 rounded-br-lg right-0 bg-red-500 border-solid border-1 -rotate-45 whitespace-nowrap px-4 text-sm md:text-base w-36 md:w-40 h-6 md:h-8 text-center text-white'>AGOTADO</div> : null}
          </div>

        </div>
        ))}


      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { name } = context.query
  const { data: products } = await axios.get(`http://${valorLocalhost}:3000/api/categoriesList`, { params: { name: name } });
  return {
    props: {
      products,
    }
  }
}

export default categories