import axios from "axios";

const API_BASE = "http://localhost:5000";

export const fetchBookingsXML = async () => {
  const response = await axios.get(`${API_BASE}/bookings`, {
    headers: { "Accept": "application/xml" }
  });
  return response.data; // XML string
};

export const createBookingXML = async (xmlPayload) => {
  const response = await axios.post(`${API_BASE}/bookings`, xmlPayload, {
    headers: { "Content-Type": "application/xml" }
  });
  return response.data;
};
