import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function AddTrans() {
  const [searchParams] = useSearchParams();
  const customerIdFromParams = searchParams.get("customerId") || "";
  const [customerId, setCustomerId] = useState(customerIdFromParams);
  const [customerName, setCustomerName] = useState("");
  const [customerAmount, setCustomerAmount] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCustomer = async () => {
      if (customerId) {
        const response = await fetch(`http://localhost:4000/customers/${customerId}`);
        if (response.ok) {
          const customerData = await response.json();
          setCustomerName(customerData.name);
        } else {
          setError("Customer not found");
        }
      }
    };
    fetchCustomer();
  }, [customerId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!customerId.trim() || !customerName.trim() || !customerAmount.trim()) {
      setError("All fields are required");
      return;
    }

    const apiUrl = `http://localhost:4000/customers/${customerId}`;
    const transactionUrl = `http://localhost:4000/transactions`;

    try {
      // Update customer data
      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: customerName }),
      });

      // Create new transaction
      const newTransaction = {
        customer_id: customerId,
        date: new Date().toISOString(),
        amount: customerAmount,
      };

      await fetch(transactionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      // Clear form and errors after successful update
      setCustomerId("");
      setCustomerName("");
      setCustomerAmount("");
      setError("");

      // Navigate to Home after successful edit
      navigate("/");

    } catch (error) {
      setError("Failed to update customer data");
      console.error("Error updating customer data:", error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center text-main my-3 h1">
        Adding Transaction for Customer
      </h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form mt-5 ps-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={customerAmount}
                  onChange={(e) => setCustomerAmount(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="btn-cont text-center">
                <button type="submit" className="btn btn-primary me-1 w-75">
                  Edit Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTrans;
