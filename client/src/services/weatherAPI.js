import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

export const getWeatherSummary = async (city, date) => {
  try {
    const response = await api.get(`/summary`, { params: { city, date } });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch weather summary:", error);
    return null;
  }
};

export const checkAlertThreshold = async () => {
  try {
    const response = await api.get('/threshold');
    return response.data.threshold; // Ensure backend has an endpoint returning threshold
  } catch (error) {
    console.error("Error fetching alert threshold:", error);
    return 35; // Default threshold
  }
};
