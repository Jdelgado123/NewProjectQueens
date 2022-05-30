import Image from 'next/image'
import React from 'react'

const Main = ({products}) => {
    console.log(products)
  return (
    <div>
        <h1>aea</h1>
        {products.map(product => (
            <div key={product.id}>
                <img src={`data:image/jpg;base64,${encodeURI(product.img)}`} width={32} height={32}/>
            </div>
        ))}
    </div>
  )
}

export default Main