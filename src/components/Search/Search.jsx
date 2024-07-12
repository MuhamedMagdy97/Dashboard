import React from 'react';

function Search({ searchTerm, setSearchTerm }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  return (
    <div className="col-md-6 mx-auto d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search by Name or Amount"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange} 
      />
   
    </div>
  );
}

export default Search;


