import React, {useState} from "react";
import "../styles/CustomersPage.css";
import CustomerSearch from "../components/CustomerSearch";
import CustomerDetails from "../components/CustomerDetails";
import ActionButton from "../components/ActionButton";
import AppointmentTable from "../components/AppointmentTable";
// eslint-disable-next-line
import BlackList from "../components/BlackList";
import Modal from "../components/Modal";
import ModalAppointment from "../components/ModalAppointment";

const CustomersPage = () => {

    // eslint-disable-next-line
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value) => {
        setSearchTerm(value);
        console.log("Searching for:", value);
        // Add logic to filter customers based on `value`
    };

    const buttons = ["תור חדש", "מסרון תזכורת", "עדכון פרטים", "הצהרות והסכמים", "חסימת לקוחה", "מחיקת לקוחה"];

        // CHECK
        const [isModalOpen, setIsModalOpen] = useState(false);
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
        // END ECHECK

    return (
        <div className="customers-page">

            <CustomerSearch placeholder="חפש לפי שם מלא / מספר טלפון / ת.ז. / הערה חופשית" onSearch={handleSearch}/>
            <h2 className="new-section">פרטים כלליים</h2>
            {/* <BlackList/> */}
            <CustomerDetails cusomerId="1"/>

            <div className="btns-container">
            {buttons.map((text, index) => (
                <ActionButton text={text} />
            ))}
            </div>

            <h2 className="new-section">תורים</h2>
            <AppointmentTable/>

            <button onClick={openModal}>Open Popup</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalAppointment/>
            </Modal>

        </div>
    );

};

export default CustomersPage;