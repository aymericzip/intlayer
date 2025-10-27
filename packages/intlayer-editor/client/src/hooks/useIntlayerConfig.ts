import type { IntlayerConfig } from '@intlayer/types';
import { useEffect, useState } from 'react';

export const useIntlayerConfig = () => {
  const [intlayerConfig, setIntlayerConfig] = useState<IntlayerConfig>();

  useEffect(() => {
    fetch('/api/config')
      .then((response) => response.json())
      .then((data) => setIntlayerConfig(data.data));
  }, []);

  return intlayerConfig;
};
