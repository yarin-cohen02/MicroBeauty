import React, { useState, useEffect, useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import he from "date-fns/locale/he";
import Select from "react-select";
import "../styles/SendSms.css";
import config from "../config";

registerLocale("he", he);

const SendSms = () => {
    const [selectedTiming, setSelectedTiming] = useState("מיידי");
    const [selectedRecipients, setSelectedRecipients] = useState("כל הלקוחות");
    const [selectedDate, setSelectedDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [message, setMessage] = useState("");
    const [techniques, setTechniques] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const textAreaRef = useRef(null);

    // Fetch techniques from the backend
    const fetchTechniques = async () => {
        try {
            const res = await fetch("/api/techniques");
            const data = await res.json();
            setTechniques(data.customers.map((item) => ({ label: item.name, value: item.id })));
        } catch (error) {
            console.error("Error fetching techniques:", error);
        }
    };

    // Fetch customers from the backend based on a query
    const fetchCustomers = async (query) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/customers?query=${query}`);
            const data = await res.json();
            setCustomers(data.customers.map((item) => ({ label: `${item.first_name} ${item.last_name}`, value: item.id })));
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced search for customers
    const handleCustomerSearch = useCallback((inputValue) => {
        if (inputValue.length >= 3) {
            fetchCustomers(inputValue);
        } else {
            setCustomers([]);
        }
    }, []);

    useEffect(() => {
        if (selectedRecipients === "טכניקה מסויימת") {
            fetchTechniques();
        }
    }, [selectedRecipients]);

    const insertAtCursor = (text) => {
        const textArea = textAreaRef.current;
        if (!textArea) return;

        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const updatedText = message.slice(0, start) + text + message.slice(end);
        setMessage(updatedText);

        setTimeout(() => {
            textArea.selectionStart = textArea.selectionEnd = start + text.length;
            textArea.focus();
        }, 0);
    };

    return (
        <div className="send-sms">
            <h3>שלח מסרון</h3>
            <form>
                {/* TIMING SELECTION */}
                <div className="form-group">
                    <label className="labels">תזמון:</label>
                    <button
                        type="button"
                        onClick={() => setSelectedTiming("מיידי")}
                        className={selectedTiming === "מיידי" ? "selected" : ""}
                    >
                        מיידי
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTiming("מתוזמן")}
                        className={selectedTiming === "מתוזמן" ? "selected" : ""}
                    >
                        מתוזמן
                    </button>
                    {selectedTiming === "מתוזמן" && (
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="dd/MM/yyyy HH:mm"
                            locale="he"
                            placeholderText="בחר תאריך ושעה"
                            className="custom-datepicker"
                        />
                    )}
                    <span>יש לבחור תזמון עתידי בלבד</span>
                </div>

                {/* RECIPIENTS SELECTION */}
                <div className="form-group">
                    <label className="labels">נמענים:</label>
                    {["כל הלקוחות", "תור בטווח תאריכים", "טכניקה מסויימת", "לקוחה ספציפית"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedRecipients(option)}
                            className={selectedRecipients === option ? "selected" : ""}
                        >
                            {option}
                        </button>
                    ))}
                    {selectedRecipients === "טכניקה מסויימת" && (
                        <Select
                            options={techniques || []}
                            onChange={(selectedOption) => console.log(selectedOption)}
                            placeholder="בחר טכניקה"
                            isClearable
                            isSearchable
                        />
                    )}
                    {selectedRecipients === "לקוחה ספציפית" && (
                        <Select
                            onInputChange={handleCustomerSearch}
                            options={customers || []}
                            onChange={(selectedOption) => console.log(selectedOption)}
                            placeholder="חפש לקוחה"
                            isSearchable
                            minLength={3}
                            debounceTimeout={500}
                            isClearable
                            isRtl
                            isLoading={isLoading}
                            
                        />
                    )}
                    {selectedRecipients === "תור בטווח תאריכים" && (
                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => {
                                setStartDate(dates[0]);
                                setEndDate(dates[1]);
                            }}
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            locale="he"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="בחר טווח תאריכים"
                            className="custom-datepicker"
                        />
                    )}
                </div>

                {/* MESSAGE BODY */}
                <div className="form-group message-body">
                    <label className="labels">תוכן ההודעה:</label>
                    <textarea
                        name="message"
                        rows="6"
                        placeholder="הקלד כאן את תוכן ההודעה..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        ref={textAreaRef}
                    />
                </div>

                {/* EMOJI & PLACEHOLDERS */}
                <div className="form-group">
                    <label className="labels"></label>
                    <div className="controls">
                        <span>הקפידו לא להפריז באמוג׳ים! זה חמוד, אבל רשתות הסלולר נוטות לחסום הודעות כאלו</span>
                        <div>
                            {["🎁", "🔥", "⏳", "📢", "📅", "✅", "✨", "💖"].map((emoji) => (
                                <button key={emoji} type="button" onClick={() => insertAtCursor(emoji)}>
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        <div>
                            {["שם פרטי", "שם משפחה", "טכניקה"].map((placeholder) => (
                                <button key={placeholder} type="button" onClick={() => insertAtCursor(`{${placeholder}}`)}>
                                    {placeholder}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TEST MESSAGE */}
                <div className="form-group">
                    <label className="labels">מסרון לבדיקה:</label>
                    <input type="text" />
                    <button type="button">בדיקה</button>
                    <span>הבדיקה נשלחה בהצלחה!</span>
                </div>

                {/* SUBMIT BUTTON */}
                <button type="submit">שלח</button>
            </form>
        </div>
    );
};

export default SendSms;
