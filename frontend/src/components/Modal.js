import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal-container">

        {showCloseButton && (
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        )}
        
          {children}
          
        </div>
      </div>
    );
  };

  export default Modal;