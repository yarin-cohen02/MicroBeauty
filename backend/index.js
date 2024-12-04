const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Sample GET endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello! how are you?' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
