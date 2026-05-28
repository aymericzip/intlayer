import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useEffect } from 'react';

export const useFirstConsultation = () => {
  const [lastConsultation, setLastConsultation] =
    usePersistedStore<Date | null>('first-consultation', null);

  useEffect(() => {
    if (lastConsultation === null) {
      setLastConsultation(new Date());
    }
  }, [lastConsultation]);

  return {
    lastConsultation,
    isFirstConsultation: lastConsultation === null,
    setLastConsultation,
  };
};
