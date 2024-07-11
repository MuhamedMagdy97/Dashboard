import React from 'react'
import Table from '../Table/Table'

function Transactions() {
  return (
    <div className="container Customers">
    <div className="row">
       <div className="col-md-12">
       <h3 className='text-center text-center text-main my-3 h1'>Transactions</h3>
      <div className="tbl">
      <h2 className="h4 text-sub p-3">Customer Transactions Table</h2>
      <Table />
      </div>
       </div>
    </div>
  </div>
)
}

export default Transactions
