import type { FC } from 'react';
import { useLocale } from 'react-intlayer';

export const MultilingualCard: FC = () => {
  const { locale } = useLocale();
  return <div className="m-auto">Current locale: {locale}</div>;
};
