import { useMemo } from 'react';
import { useAuth } from '../components';
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
