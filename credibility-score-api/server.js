require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows your Chrome extension to access this API
app.use(express.json()); // Enable JSON body parsing

// Sample database (Replace with a real database later)
const companyScores = {
    "google": { score: 95, rating: "Awesome" },
    "microsoft": { score: 90, rating: "Good" },
    "amazon": { score: 80, rating: "OK" },
    "meta": { score: 60, rating: "Poor" },
};

// API Endpoint: Fetch Company Score
app.get('/score/:company', (req, res) => {
    const company = req.params.company.toLowerCase();
    if (companyScores[company]) {
        res.json(companyScores[company]);
    } else {
        res.status(404).json({ error: "Company not found" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
