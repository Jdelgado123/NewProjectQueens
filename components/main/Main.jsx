import Image from 'next/image'
import React from 'react'
import ada from '../../imagesServer2/1654139768898-VjB_VhaLmso.jpg'


const Main = ({products}) => {
  return (
    <div>
        <h1>aea</h1>
            <div>
               {products.map(product=>(
                 <div key={product.id}>
                  <img src={"/ga.jpg"} width={45} height={45}/>
                 </div>
               ))} 
            </div>
    </div>
  )
}

export default Main