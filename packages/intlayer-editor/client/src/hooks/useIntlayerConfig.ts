import type { IntlayerConfig } from '@intlayer/types/config';
import { useEffect, useState } from 'preact/hooks';

export const useIntlayerConfig = () => {
  const [intlayerConfig, setIntlayerConfig] = useState<IntlayerConfig>();

  useEffect(() => {
    fetch('/api/config')
      .then((response) => response.json())
      .then((data) => setIntlayerConfig(data.data));
  }, []);

  return intlayerConfig;
};
