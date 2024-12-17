import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CustomerSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CustomerSearch = ({ placeholder, onSelectCustomer }) => {
  
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  let debounceTimer;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceTimer);

    if (value.trim() !== "") {
      debounceTimer = setTimeout(() => {
        fetchSuggestions(value);
      }, 300); // 300ms debounce time
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/customers?query=${searchTerm}`
      );
      setSuggestions(response.data.customers || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (customer) => {
    onSelectCustomer(customer);
    setQuery(customer.fullName);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="customer-search-container">
      <div className="customer-search">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowSuggestions(true)}
        />
        <div className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      {isLoading && <div className="loading">טוען...</div>}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((customer) => (
            <li
              key={customer.id}
              onClick={() => handleSelect(customer)}
              className="suggestion-item"
            >
              {customer.fullName} - {customer.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerSearch;
