const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const CBS_API = "https://opendata.cbs.nl/odata/v4/83725NED/TypedDataSet";

// Proxy endpoint for CBS API
app.get('/proxy', async (req, res) => {
    try {
        const apiUrl = `${CBS_API}${req.url.replace('/proxy', '')}`;
        console.log("Fetching from CBS:", apiUrl); // Debugging log

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`CBS API returned status ${response.status}`);

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({ error: "Failed to fetch data from CBS API", details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
