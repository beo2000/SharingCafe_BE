const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to search for places by name
app.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const apiKey = 'KnB6OOmQcQpYSTnqzYhjqUmcGSBKUob1cDF9oOPw';
    const response = await axios.get(`https://rsapi.goong.io/Place/Autocomplete?key=${apiKey}&input=${name}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
