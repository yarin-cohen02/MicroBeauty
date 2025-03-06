import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import he from "date-fns/locale/he";
import "../styles/SendSms.css";

registerLocale("he", he);

const SendSms = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className="send-sms">
            <h3>שלח מסרון</h3>
            <form>
                <div className="form-group">
                    <label className="labels">זמן:</label>
                    <button>מיידי</button><button>מתוזמן</button> 
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
                    <span>יש לבחור תזמון עתידי בלבד</span>
                </div>
                <div className="form-group">
                    <label className="labels">נמענים:</label>
                    <button>כל הלקוחות</button>
                    <button>תור בטווח תאריכים</button>
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
                    <button>טכניקה מסויימת</button>
                    <button>לקוחה ספציפית</button>
                </div>

                <div className="form-group message-body">
                    <label className="labels">תוכן ההודעה:</label>
                    <textarea name="message" rows="6" placeholder="הקלד כאן את תוכן ההודעה..."></textarea>
                </div>

                <div className="form-group">
                    <label className="labels"></label>
                    <div className="controls">
                    <span>הקפידו לא להפריז באמוג׳ים! זה חמוד, אבל רשתות הסלולר נוטות לחסום הודעות כאלו</span>
                        <div>
                            <button>🎁</button>
                            <button>🔥</button>
                            <button>⏳</button>
                            <button>📢</button>
                            <button>📅</button>
                            <button>✅</button>
                            <button>✨</button>
                            <button>💖</button>
                        </div>
                        <div><button>שם פרטי</button><button>שם משפחה</button><button>טכניקה</button></div>
                        
                    </div>
                </div>
                
                <div className="form-group">
                    <label className="labels">מסרון לבדיקה:</label>
                    <input type="text"/> <button>בדיקה</button> <span>הבדיקה נשלחה בהצלחה!</span>
                </div>
                <button>שלח</button>
            </form>
        </div>
    );
};

export default SendSms;
