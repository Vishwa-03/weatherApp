import axios from 'axios';

const API_KEY = '3965eb690a6d422881e182114240407'; // Replace with your WeatherAPI API key
const BASE_URL = 'http://api.weatherapi.com/v1';

export const fetchWeather = async (city) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Unable to fetch weather data. Please try again.');
  }
};

export const fetchForecast = async (city) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 7 // Fetch forecast for 7 days
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw new Error('Unable to fetch forecast data. Please try again.');
  }
};
