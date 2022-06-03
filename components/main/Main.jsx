import Image from 'next/image'
import React from 'react'


const Main = ({products}) => {
  return (
    <div>
        <h1>Aca estara la interfaz de compra</h1>
            <div>
               {products.map(product=>(
                 <div key={product.id}>
                   <Image src={"/imagesServer2/"+product.name_img} width={500} height={500}/>
                 </div>
               ))} 
            </div>
    </div>
  )
}

export default Main