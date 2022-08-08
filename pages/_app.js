import React from 'react'
import { StateContext } from '../context/StateContext'
import { CookiesProvider } from "react-cookie"

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return( 
  <StateContext>
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  </StateContext>
  )
}

export default MyApp
