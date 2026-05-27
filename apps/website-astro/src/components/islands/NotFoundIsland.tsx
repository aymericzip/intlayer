/** @jsxImportSource react */

import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

const NotFoundContent: FC = () => {
  const { title, content } = useIntlayer('not-found');

  return (
    <span className="m-32 flex justify-center gap-3 text-center font-bold text-4xl text-darkGray md:justify-end">
      <span className="relative flex items-center">
        {content}
        <span className="absolute left-1/2 -translate-x-1/2 text-[9rem] opacity-10">
          404
        </span>
      </span>
    </span>
  );
};

export const NotFoundIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale} showEmailToast={false}>
    <NotFoundContent />
  </WebsiteIslandWrapper>
);
