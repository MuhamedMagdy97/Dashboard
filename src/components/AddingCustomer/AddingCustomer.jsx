import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddingCustomer() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/customers");
    const customers = await response.json();

    // Get the highest existing numeric ID
    const maxId = customers.reduce((max, customer) => {
      const id = parseInt(customer.id, 10);
      return id > max ? id : max;
    }, 0);

    // New ID will be the highest existing ID + 1
    const newId = (maxId + 1).toString();
    const newCustomer = {
      id: newId,
      name: name,
    };

    await fetch("http://localhost:4000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });

    const newTransaction = {
      customer_id: newId,
      amount: 0,
      date: new Date().toISOString(),
    };

    await fetch("http://localhost:4000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    navigate("/customers");
  };

  return (
    <div className="container">
      <h3 className="text-center text-main my-3 h1">Adding Customer</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form mt-5 ps-5">
            <form onSubmit={handleAddCustomer}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label" id="Name">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  aria-describedby="name"
                  required
                />
              </div>
              <div className="btn-cont text-center">
                <button type="submit" className="btn btn-primary me-1 w-75">
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddingCustomer;
