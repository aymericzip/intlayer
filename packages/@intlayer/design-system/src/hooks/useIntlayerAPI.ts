import { useAuth } from '../components';
import { getIntlayerAPI } from '../libs/intlayer-api';

export const useIntlayerAPI = () => {
  const { csrfToken } = useAuth();

  return getIntlayerAPI({
    body: { csrf_token: csrfToken },
  });
};
