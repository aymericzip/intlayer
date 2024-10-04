import { useMemo } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { getIntlayerAPI } from '../libs/intlayer-api';

export const useIntlayerAPI = () => {
  const { csrfToken } = useAuth();

  return useMemo(
    () =>
      getIntlayerAPI({
        body: { csrf_token: csrfToken },
      }),
    [csrfToken]
  );
};
