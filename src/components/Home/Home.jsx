import React, { useState } from 'react';
import Table from '../Table/Table';
import Search from '../Search/Search'; 

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className='container vh-100'>
        <h2 className='text-center text-main h1'>Dashboard</h2>
        <div className="tbl">
          <h2 className="h4 text-sub p-3">Customer Transactions Table</h2>
          <div className="container">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="container mt-5">
            <Table showActions={false} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
