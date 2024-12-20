const express = require('express');
const cors = require('cors');
const { sendSms } = require('./smsService');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});


app.get('/', (req, res) => {
    res.json({ message: 'Hello! How are you?' });
});

app.post('/send-sms', async (req, res) => {
    const { to, body } = req.body;

    // Validate input
    if (!to || !body) {
        return res.status(400).json({ error: 'Missing "to" or "body" in request.' });
    }

    try {
        const message = await sendSms(to, body);
        res.status(200).json({ message: 'SMS sent successfully!', data: message });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS. Please try again later.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
