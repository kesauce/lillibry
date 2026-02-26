// Import Express
import express from 'express';
const app = express();

// Define a route
const PORT = 8000
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});