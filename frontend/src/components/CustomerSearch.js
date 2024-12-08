import React from "react";
import "../styles/CustomerSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CustomerSearch = ({ placeholder, onSearch }) => {
    return (
      <div className="customer-search">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    );
  };  

export default CustomerSearch;