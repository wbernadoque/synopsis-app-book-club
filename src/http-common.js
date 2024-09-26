const axios = require("axios").default;
export const api_caller = axios.create({
  baseURL: process.env.VUE_APP_AWS_SYNOPSIS_BASE_URL
})