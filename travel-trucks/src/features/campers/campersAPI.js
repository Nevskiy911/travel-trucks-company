import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCampers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error loading all camper data"
    );
  }
};

export const getCamperById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error loading this camper's data"
    );
  }
};
