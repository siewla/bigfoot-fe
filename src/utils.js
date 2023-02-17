import axios from "axios";

export const BACKEND_URL = "http://localhost:4000/";

export const get = async (url, params) => {
  const response = await axios.get(url, { params });
  return response.data;
};

export const post = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

export const put = async (url, data) => {
  const response = await axios.put(url, data);
  return response.data;
};

export const del = async (url, data) => {
  const response = await axios.delete(url, data);
  return response.data;
};
