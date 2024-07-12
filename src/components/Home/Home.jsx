import React from 'react'
import Table from '../Table/Table'

function Home() {
  return <>
  <div className='container'>
  <h2 className='text-center text-main h1'>Dashboard</h2>
  <div className="tbl">
      <h2 className="h4 text-sub p-3">Customer Transactions Table</h2>
      <Table showActions={false} />;
      </div>
  </div>
  </>
}

export default Home