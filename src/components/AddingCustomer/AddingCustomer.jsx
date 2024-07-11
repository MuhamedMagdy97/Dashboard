import React from "react";
import { Link } from "react-router-dom";

function AddingCustomer() {
  return (
    <>
      <div className="container">
        <h3 className="text-center text-center text-main my-3 h1">
          Adding customer
        </h3>
        <div className="row mb-3 ">
          <div className="col-md-6">
            <div className="form mt-5 ps-5">
              <form>
                <div class="mb-3">
                  <label for="name" class="form-label" id="Name">
                    Name
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="name"
                    name="name"
                    aria-describedby="name"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="btn-cont text-center">
                  <Link
                    className="btn btn-primary me-1 w-75 "
                    role="button"
                    to={"/"}
                  >
                    Add customer
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddingCustomer;
