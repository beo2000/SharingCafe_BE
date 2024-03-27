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

// Hàm tính tọa độ điểm ở giữa của một khoảng cách trên mặt cầu
function tinhDiemGiuaCuaKhoangCach(lat1, lon1, lat2, lon2) {
  const toRadians = degrees => degrees * (Math.PI / 180);
  const R = 6371;

  const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);

  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  const latMiddle = (lat1 + lat2) / 2;
  const lngMiddle = (lon1 + lon2) / 2;

  return { lat: latMiddle, lng: lngMiddle };
}

export async function getMiddlePoint(req, res) {
  try {
    const originsLAT = req.query.originsLAT * 1;
    const originsLNG = req.query.originsLNG * 1;
    const destinationsLAT = req.query.destinationsLAT * 1;
    const destinationsLNG = req.query.destinationsLNG * 1;

    const { lat, lng } = tinhDiemGiuaCuaKhoangCach(originsLAT, originsLNG, destinationsLAT, destinationsLNG);

    res.status(200).json({ lat, lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRecommendCafe(req, res) {
  try {
    // Gọi hàm getMiddlePoint và nhận kết quả trả về
    const { lat, lng } = await getMiddlePoint(req, res);

    const name = req.query.name;
    let radius = 5; // Khởi tạo bán kính mặc định là 5 km
    let response;

    // Lặp cho đến khi nhận được kết quả hoặc đạt tới giới hạn bán kính
    while (!response && radius <= 10) {
      response = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?input=Highland&location=lat%2C%20lng&limit=200&radius=${radius}&api_key=KnB6OOmQcQpYSTnqzYhjqUmcGSBKUob1cDF9oOPw`);

      // Nếu không nhận được kết quả, tăng radius lên 1 đơn vị km
      if (!response.data || !response.data.length) {
        radius += 1;
      }
    }

    if (response && response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: 'No results found within the search radius.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}