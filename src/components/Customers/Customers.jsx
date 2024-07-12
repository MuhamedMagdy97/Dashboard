import React from "react";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";

function Customers() {
  const navigate = useNavigate();
  const handleAddCustomer = () => {
    navigate("/AddingCustomer"); 
  };

  return (
    <div className="container Customers">
      <div className="row">
        <div className="col-md-9">
          <h3 className="text-center text-main my-3 h1">
            Customers
          </h3>
          <div className="tbl">
            <h2 className="h4 text-sub p-1">Customer Transactions Table</h2>
           
            <div className="row mb-3">
              <div className="col-md-5">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search by Name or Amount"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search 
                  </button>
                </form>
              </div>
              <div className="col-md-3 text-end">
                <button className="btn btn-primary w-100" onClick={handleAddCustomer}>
                  Add customer
                </button>
              </div>
              
            </div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
