import axios from "axios";
import config from "../config.js";

const BASE_URL = config.API_BASE_URL;
console.log(BASE_URL);

export const sendSms = async (to, body) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-sms`, { to, body });
    return response.data;
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
};
