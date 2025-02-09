import axios from "axios";
const BASE_URL = "https://creditsea-assignment-yljz.onrender.com/api/files";

export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, formData);
    const { documentId } = response.data;
    return documentId;
  } catch (error) {
    console.log(error);
    throw new Error("File upload failed");
  }
};

export const getCreditReport = async (documentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/credit-report/${documentId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch credit report");
  }
};
