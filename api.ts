const axios = require("axios").default;

// PROD
axios.defaults.baseURL = "http://synopsis-prod.us-east-2.elasticbeanstalk.com/";

// DEV
// axios.defaults.baseURL = "http://synopsis-dev.us-east-2.elasticbeanstalk.com/";
const apiInstance = axios.create();

export default apiInstance;
