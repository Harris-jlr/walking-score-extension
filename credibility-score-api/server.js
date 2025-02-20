const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" })); // 🔥 Allow all origins (Fixes CORS)

app.get("/score/:companyId", (req, res) => {
    const companyId = req.params.companyId;
    console.log(`Received request for companyId: ${companyId}`);

    // Example static score (replace this with actual score logic)
    const score = Math.floor(Math.random() * 100);
    res.json({ companyId, score });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
