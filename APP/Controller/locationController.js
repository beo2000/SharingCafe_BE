import axios from 'axios';

export async function getGeocode(address) {
    try {
      const response = await axios.get(
        `https://rsapi.goong.io/Geocode?key=${GOONG_API_KEY}&address=${encodeURIComponent(address)}`
      );
  
      if (response.data && response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0].geometry;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  }