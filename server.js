const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

const API_KEY = "6164ffdd0e80b695d457260a1cc6d0c7"; // <-- Put your API key here

app.use(express.static(path.join(__dirname, "public")));

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: "City not found or API issue" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});