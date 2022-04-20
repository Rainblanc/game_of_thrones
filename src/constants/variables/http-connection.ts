import axios from 'axios';

const HttpConnection = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

export { HttpConnection };
