import React, { useState } from 'react';
import Table from '../Table/Table';
import Search from '../Search/Search';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container Customers vh-100">
      <div className="row">
        <div className="col-md-12">
          <h3 className='text-center text-main my-3 h1'>Transactions</h3>
          <div className="tbl">
            <h2 className="h4 text-sub p-3">Customer Transactions Table</h2>
            <div className="row mb-3">
              <Search onSearch={handleSearch} />
            </div>
            <Table showActions={true} showCustomerId={false} aggregateTransactions={false} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
