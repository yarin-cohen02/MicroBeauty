import React, {useState} from "react";
import "../styles/CustomersPage.css";
import CustomerSearch from "../components/CustomerSearch";
import CustomerDetails from "../components/CustomerDetails";
import ActionButton from "../components/ActionButton";
import AppointmentTable from "../components/AppointmentTable";

const CustomersPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value) => {
        setSearchTerm(value);
        console.log("Searching for:", value);
        // Add logic to filter customers based on `value`
    };

    const buttons = ["תור חדש", "מסרון תזכורת", "עדכון פרטים", "הצהרות והסכמים", "חסימת לקוחה"];
    const appointments = [];

    return (
        <div className="customers-page">

            <CustomerSearch placeholder="חפש לפי שם מלא / מספר טלפון / ת.ז." onSearch={handleSearch}/>

            <h2 className="new-section">פרטים כלליים</h2>
            <CustomerDetails cusomerId="1"/>

            <div className="btns-container">
            {buttons.map((text, index) => (
                <ActionButton text={text} />
            ))}
            </div>

            <h2 className="new-section">תורים</h2>
            <AppointmentTable appointments={appointments}/>

        </div>
    );

};

export default CustomersPage;