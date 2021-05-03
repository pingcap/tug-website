import Cookie from 'js-cookie';
import axios from 'axios';

export * as events from './events';
export * as orgs from './orgs';
export { me } from './me';

export const GLOBAL_ERROR_HANDLED = Symbol.for('GLOBAL_ERROR_HANDLED');

let initApiCalled = false;
let initApiContext = {
  globalErrorHandler: undefined,
};

export const initApi = (globalErrorHandler) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

  if (!globalErrorHandler) {
    throw new Error('failed to init api: globalErrorHandler not provided');
  }
  initApiContext.globalErrorHandler = globalErrorHandler;
  if (initApiCalled) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('if the interceptor was modified, you should reload browser');
    }
    return;
  }
  initApiCalled = true;
  axios.defaults.headers = {
    'Accept-Language': 'zh-hans',
  };

  // set csrf token if required
  initApiContext.csrfInterceptorId = axios.interceptors.request.use((config) => {
    if (!/p(?:ost|ut|atch)|delete/i.test(config.method)) {
      return config;
    }

    const csrftoken = Cookie.get('csrftoken');
    if (!csrftoken) {
      return config;
    }

    if (!config.headers) {
      config.headers = {};
    }
    config.headers['csrftoken'] = csrftoken;
    return config;
  });

  // translate resp data
  initApiContext.respInterceptorId = axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response) {
        if (error.response.status !== 400) {
          return Promise.reject(initApiContext.globalErrorHandler(error.response) || GLOBAL_ERROR_HANDLED);
        }
        if (error.response.headers['content-type'] === 'json') {
          // TODO: translate body
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(initApiContext.globalErrorHandler(error.response) || GLOBAL_ERROR_HANDLED);
        }
      } else {
        return Promise.reject(error);
      }
    }
  );
};
