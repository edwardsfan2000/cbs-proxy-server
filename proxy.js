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
        const response = await fetch(CBS_API);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching CBS data" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));