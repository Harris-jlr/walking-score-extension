const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow requests from your Chrome extension
app.use(cors({
    origin: "*", // Change to a specific origin for better security
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ API Endpoint to fetch Walking Score
app.get("/score/:companyId", (req, res) => {
    const companyId = req.params.companyId;

    // ✅ Make sure `companyId` is valid
    if (!companyId || companyId === "undefined") {
        return res.status(400).json({ error: "Invalid Company ID" });
    }

    // ✅ Mock response (Replace with real logic later)
    const score = Math.floor(Math.random() * 100); 
    res.json({ score });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
