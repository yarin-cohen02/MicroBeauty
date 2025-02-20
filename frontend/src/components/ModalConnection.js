import { useState, useEffect } from "react";
import Modal from "./Modal";
import config from "../config";

const ModalConnection = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [backendDown, setBackendDown] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // MAKE A PING
    const pingBackend = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/health`, { method: "GET" });
        if (!response.ok) throw new Error("Backend is down");
        setBackendDown(false); 
      } catch (error) {
        setBackendDown(true); 
      }
    };

    const interval = setInterval(pingBackend, 5000); // EVERY 5 SECS
    pingBackend(); // FIRST TIME

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const showModal = isOffline || backendDown;

  return (
    <Modal isOpen={showModal} showCloseButton={false}>
      <h2>אופס... נראה שיש בעיה!</h2>
      <p>{isOffline ? "אין חיבור לאינטרנט. בדוק את החיבור שלך ונסה שוב." : "השרת לא זמין כרגע. נסה שוב מאוחר יותר."}</p>
    </Modal>
  );
};

export default ModalConnection;