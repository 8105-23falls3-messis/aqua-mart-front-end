//Connecting Backend to frontend using Axios 

import axios from 'axios';

const yourJwtToken =  "xxxx";

// Create an Axios instance with custom headers
const axiosInstance = axios.create({
  baseURL: 'http://18.226.27.5:8081/', // Replace with your API base URL
  headers: {
    Authorization: `Bearer ${yourJwtToken}`, // Replace with your JWT token
    'Content-Type': 'application/json', // Set the content type
  },
  
});

export default axiosInstance;