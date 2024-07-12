import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="col-md-6">
      <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by Name or Amount"
          aria-label="Search"
          value={query}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
