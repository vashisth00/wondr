const axios = require("axios");
const APIURL = "https://pixabay.com/api";
export const getImages = (page = 1) =>
  axios.get(`${APIURL}/?page=${page}&key=${process.env.REACT_APP_APIKEY}`);
export const searchImages = (keyword, page = 1) =>
  axios.get(
    `${APIURL}/?page=${page}&key=${process.env.REACT_APP_APIKEY}&q=${keyword}`
  );