import React, { useState } from "react";
import Table from "../Table/Table";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCustomer = () => {
    navigate("/AddingCustomer");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container Customers">
      <div className="row">
        <div className="col-md-9">
          <h3 className="text-center text-main my-3 h1">Customers</h3>
          <div className="tbl">
            <h2 className="h4 text-sub p-1">Customer Transactions Table</h2>
            <div className="row mb-3 d-flex justify-content-between align-items-end">
              <Search onSearch={handleSearch} />
              <div className="col-md-2 text-end">
                <button className="btn btn-primary w-100" onClick={handleAddCustomer}>
                  Add customer
                </button>
              </div>
            </div>
            <Table showActions={true} showCustomerId={true} aggregateTransactions={true} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
