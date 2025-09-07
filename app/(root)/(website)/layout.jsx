import React from 'react'
import Header from '@/components/Application/Website/Header'
import Footer from '@/components/Application/Website/Footer'
import { Kumbh_Sans } from 'next/font/google'

const Kumbh = Kumbh_Sans({
  weight: ['400', '500', '600', '700' , '800' , '900'],
  display: 'swap' ,
  subsets: ['latin']
})

const layout = ({ children }) => {
  return (
    <div className={Kumbh.className}> 
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default layout
