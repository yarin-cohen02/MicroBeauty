import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CustomerSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CustomerSearch = ({ placeholder, onSelectCustomer }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let debounceTimer;

  // HERE I STOPPED 

  return (
    <div>
      <div className="customer-search">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CustomerSearch;
