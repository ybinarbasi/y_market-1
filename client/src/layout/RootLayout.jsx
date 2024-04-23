import React from 'react'
import AdminSidebar from './AdminSidebar'

function RootLayout(props) {
  return (
    <section className=" flex  w-full  ">
      <AdminSidebar />
      <div className='w-full  px-6 '>
        {props.children}
      </div>
    </section>
  )
}

export default RootLayout