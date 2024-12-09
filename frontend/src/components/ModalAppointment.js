import React, { useState } from "react";
import "../styles/ModalAppointment.css";

const ModalAppointment = () => {
  const [price, setPrice] = useState("1200");
  const [phoneNumber, setPhoneNumber] = useState("0542444906");
  const [sendSms, setSendSms] = useState(true);

  const handlePriceChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const handlePhoneNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };

  return (
    <div className="modal-appointment-container">
      <h2 className="modal-appointment-title">קביעת תור</h2>

      <table className="modal-apt-table">
        <tbody>
          <tr>
            <td className="label-modal-apt">תאריך</td>
            <td>
              <input className="value-modal-apt" type="date" />
            </td>
            <td className="label-modal-apt">שעה</td>
            <td>
              <input className="value-modal-apt" type="time" />
            </td>
          </tr>

          <tr>
            <td className="label-modal-apt">סוג תור</td>
            <td>
              <select className="value-modal-apt">
                <option>תור ראשון</option>
                <option>תור שני</option>
                <option>ייעוץ בלבד</option>
              </select>
            </td>
            <td className="label-modal-apt">טכניקה</td>
            <td>
              <select className="value-modal-apt">
                <option>מיקרובליידינג</option>
                <option>פודרה</option>
              </select>
            </td>
          </tr>

          <tr>
            <td className="label-modal-apt">מחיר</td>
            <td colSpan="3">
              <input
                className="value-modal-apt"
                type="text"
                value={price}
                onChange={handlePriceChange}
              />
            </td>
          </tr>

          <tr>
            <td className="label-modal-apt">שלח מסרון</td>
            <td>
              <input
                className="value-modal-apt"
                type="checkbox"
                checked={sendSms}
                onChange={() => setSendSms(!sendSms)}
              />
            </td>
            <td className="label-modal-apt">למספר</td>
            <td>
              <input
                className="value-modal-apt"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button className="modal-appointment-save-button">שמור</button>
    </div>
  );
};

export default ModalAppointment;
