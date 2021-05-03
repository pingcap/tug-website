import Cookie from 'js-cookie';
import axios from 'axios';

import { dispatchApiError } from './events';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
});

client.interceptors.request.use((config) => {
  const { method, headers } = config;

  if (/get/i.test(method)) {
    config.headers = {
      ...headers,
      csrftoken: Cookie.get('csrftoken'),
    };
  }

  return config;
});

client.interceptors.response.use(
  ({ data }) => data,
  (err) => {
    const { response } = err;
    const { status, data } = response;

    if (typeof window !== 'undefined') {
      dispatchApiError(response);
    }

    if (status === 400) {
      return Promise.reject(data);
    } else {
      return Promise.reject(response);
    }
  }
);

export default client;
