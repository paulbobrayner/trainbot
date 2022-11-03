import axios from 'axios';

const base = process.env.REACT_APP_BASE_URL;

export const getTrains = async (station) => {
  const response = await axios.get(`${base}trains/${station}`);
  return response;
};
