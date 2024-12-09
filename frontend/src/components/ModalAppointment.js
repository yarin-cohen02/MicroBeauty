import React from "react";
import "../styles/ModalAppointment.css";

const ModalAppointment = () => {
  return (
    <div>
      <h2>קביעת תור</h2>

      <table className="modal-apt-table">
        <tbody>
          <tr>
            <td className="label-modal-apt">תאריך</td>
            <td>
              <input className="value-modal-apt" />
            </td>
            <td className="label-modal-apt">שעה</td>
            <td>
              <input className="value-modal-apt" />
            </td>
          </tr>

          <tr>
            <td className="label-modal-apt">סוג תור</td>
            <td>
              <input className="value-modal-apt" />
            </td>
            <td className="label-modal-apt">טכניקה</td>
            <td>
              <input className="value-modal-apt" />
            </td>
          </tr>

          <tr>
            <td className="label-modal-apt">מחיר</td>
            <td>
              <input className="value-modal-apt first-sec" />
            </td>
          </tr>

          <tr>
            <td className="label-modal-apt">שלח מסרון</td>
            <td>
              <input className="value-modal-apt" />
            </td>
            <td className="label-modal-apt">למספר</td>
            <td>
              <input className="value-modal-apt" />
            </td>
          </tr>

        </tbody>
      </table>

      <button>שמור</button>
    </div>
  );
};

export default ModalAppointment;
