import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { useEffect, useState } from 'react';

export const useIntlayerConfig = () => {
  const [intlayerConfig, setIntlayerConfig] = useState<IntlayerConfig>();

  useEffect(() => {
    if (import.meta.env.PROD) {
      fetch('/api/config')
        .then((response) => response.json())
        .then((data) => setIntlayerConfig(data.data));
    }

    if (import.meta.env.DEV) {
      const envConfig = getConfiguration();

      setIntlayerConfig(envConfig);
    }
  }, []);

  return intlayerConfig;
};
