import { useCallback, useEffect } from 'react';

const API_ERROR_EVENT = '@tidb-community/datasource:API_ERROR';

export const dispatchApiError = (detail) => {
  const e = new CustomEvent(API_ERROR_EVENT, {
    detail,
  });
  window.dispatchEvent(e);
};

export const addApiErrorListener = (listener, ...rest) => {
  const listenerWrapper = ({ detail }) => listener(detail);
  window.addEventListener.apply(null, [API_ERROR_EVENT, listenerWrapper, ...rest]);
};

export const removeApiErrorListener = (listener, ...rest) => {
  window.removeEventListener.apply(null, [API_ERROR_EVENT, listener, ...rest]);
};

export const useApiErrorListener = (listener, ...rest) => {
  const _listener = useCallback(listener, [listener]);

  useEffect(() => {
    const listenerWrapper = ({ detail }) => _listener(detail);
    const args = [API_ERROR_EVENT, listenerWrapper, ...rest];
    window.addEventListener.apply(null, args);
    return () => {
      window.removeEventListener.apply(null, args);
    };
  }, [_listener, rest]);
};
