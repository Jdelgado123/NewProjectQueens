import Image from 'next/image'
import React from 'react'


const Main = ({products}) => {
  return (
    <div>
        <h1>Aca estara la interfaz de compra</h1>
            <div>
               {products.map(product=>(
                 <div key={product.id}>
                   <h1>{product.name}</h1>
                 </div>
               ))} 
            </div>
    </div>
  )
}

export default Main