const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies (for API routes if needed)
app.use(express.json());

// Serve the main HTML file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route to handle subscription data (if needed)
app.post('/api/subscription', (req, res) => {
    const subscription = req.body;
    // Here you would typically save the subscription data to a database
    console.log('Received subscription:', subscription);
    res.status(201).send({ message: 'Subscription saved successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
