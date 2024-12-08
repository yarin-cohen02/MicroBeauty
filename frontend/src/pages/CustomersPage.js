import React, {useState} from "react";
import "../styles/CustomersPage.css";
import CustomerSearch from "../components/CustomerSearch";
import CustomerDetails from "../components/CustomerDetails";

const CustomersPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value) => {
        setSearchTerm(value);
        console.log("Searching for:", value);
        // Add logic to filter customers based on `value`
    };

    return (
        <div className="customers-page">
            <CustomerSearch placeholder="חפש לפי שם מלא / מספר טלפון / ת.ז." onSearch={handleSearch}/>
            <h2 className="new-section">פרטים כלליים</h2>
            <CustomerDetails cusomerId="1"/>
        </div>
    );

};

export default CustomersPage;