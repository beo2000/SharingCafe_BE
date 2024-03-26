// const express = require('express');
import axios from 'axios';
import { json } from 'sequelize';

// const app = express();
// const PORT = process.env.PORT || 3000;

// Endpoint to search for places by name
// app.get('/search', async (req, res) => {
//   try {
//     const { name } = req.query;
//     const apiKey = 'KnB6OOmQcQpYSTnqzYhjqUmcGSBKUob1cDF9oOPw';
//     const response = await axios.get(`https://rsapi.goong.io/Place/Autocomplete?key=${apiKey}&input=${name}`);
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const apiKey = 'KnB6OOmQcQpYSTnqzYhjqUmcGSBKUob1cDF9oOPw';

export async function getLocation(req, res){
  try {
    const name  = req.query.name;
    const lat = req.query.lat;
    const lng = req.query.lng;
    const response = await axios.get(`https://rsapi.goong.io/Place/Autocomplete?api_key=${apiKey}&input=Highland&location=${lat},${lng}&limit=30&radius=10`);
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getDistance(req, res) {
  try {
    const originsLAT = req.query.originsLAT;
    const originsLNG = req.query.originsLNG;
    const destinationsLAT = req.query.destinationsLAT;
    const destinationsLNG = req.query.destinationsLNG;
    const response = await axios.get(`https://rsapi.goong.io/DistanceMatrix?origins=${originsLAT},${originsLNG}&destinations=${destinationsLAT},${destinationsLNG}&vehicle=bike&api_key=${apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRecommend(req, res){
  try {
    const originsLAT = req.query.originsLAT*1;
    const originsLNG = req.query.originsLNG*1;
    const destinationsLAT = req.query.destinationsLAT*1;
    const destinationsLNG = req.query.destinationsLNG*1;
    const distance = Math.sqrt(Math.pow(originsLNG - originsLAT, 2) + Math.pow(destinationsLNG - destinationsLAT, 2))/2;

    console.log(distance);
    // res.status(200).json(response.data);
    res.status(200).json(distance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
