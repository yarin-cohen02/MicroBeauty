import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5001/api')  // Replace with your backend URL if different
            .then(response => {
                setMessage(response.data.message); // Store the backend response in state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className="App">
            <h1>{message}</h1>  {/* Display the message from the backend */}
        </div>
    );
}

export default App;
