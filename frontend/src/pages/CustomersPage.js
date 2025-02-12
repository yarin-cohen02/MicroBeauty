import React, { useState } from "react";
import "../styles/CustomersPage.css";
import CustomerSearch from "../components/CustomerSearch";
import CustomerDetails from "../components/CustomerDetails";
import ActionButton from "../components/ActionButton";
import AppointmentTable from "../components/AppointmentTable";
import BlackList from "../components/BlackList";
// import Modal from "../components/Modal";
// import ModalAppointment from "../components/ModalAppointment";

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Handler for when a customer is selected
  const handleCustomerSelect = (customerData) => {
    setSelectedCustomer(customerData); // Set the selected customer data
  };

  const buttons = [
    "תור חדש",
    "מסרון תזכורת",
    "עדכון פרטים",
    "הצהרות והסכמים",
    "חסימת לקוחה",
    "מחיקת לקוחה",
  ];

  // CHECK
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  // END ECHECK

  return (
    <div className="customers-page">
      <CustomerSearch
        placeholder="חפש לפי שם מלא / מספר טלפון / תעודת זהות / הערה חופשית"
        onSelectCustomer={handleCustomerSelect}
      />

      {/* {console.log("selectedCustomer", selectedCustomer)} */}

      {selectedCustomer && (
        <div className="rest-of-page">
          <h2 className="new-section">פרטים כלליים</h2>
          {selectedCustomer.is_black_list && <BlackList/>}
          <CustomerDetails customer={selectedCustomer} />

          <div className="btns-container">
            {buttons.map((text, index) => (
              <ActionButton text={text} />
            ))}
          </div>

          <h2 className="new-section">תורים</h2>
          <AppointmentTable />

          {/* <button onClick={openModal}>Open Popup</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalAppointment/>
            </Modal> */}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
