import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCampers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return Array.isArray(response.data)
      ? response.data
      : response.data.items || [];
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    return [];
  }
};

export const getCamperById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    return null;
  }
};
