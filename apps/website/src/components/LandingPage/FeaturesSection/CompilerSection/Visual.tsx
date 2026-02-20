'use client';

import { H3, Select } from '@intlayer/design-system';
import { getLocaleName, Locales } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useState } from 'react';

type VisualEditorSectionProps = {
  scrollProgress: number;
};

export const VisualEditorSection: FC<VisualEditorSectionProps> = ({
  scrollProgress,
}) => {
  const { availableLocales } = useLocale();
  const [isControlled, setIsControlled] = useState(false);
  const [manualLocale, setManualLocale] = useState<string>(Locales.ENGLISH);

  let locale = manualLocale;

  if (!isControlled) {
    if (scrollProgress > 1) {
      locale = Locales.RUSSIAN;
    } else if (scrollProgress > 0.9) {
      locale = Locales.CHINESE;
    } else if (scrollProgress > 0.6) {
      locale = Locales.SPANISH;
    } else if (scrollProgress > 0.3) {
      locale = Locales.FRENCH;
    } else {
      locale = Locales.ENGLISH;
    }
  }

  const { title, paragraph, selectPlaceholder, localeSelectorTrigger } =
    useIntlayer('compiler-section', locale);

  return (
    <div className="relative z-0 flex size-full flex-col justify-center gap-10 overflow-hidden rounded-r-2xl bg-neutral-50 p-6 text-center dark:bg-neutral-950">
      <H3>{title}</H3>
      <p className="text-neutral text-sm">{paragraph}</p>
      <div className="absolute right-6 bottom-6">
        <Select
          value={locale}
          onValueChange={(value) => {
            setIsControlled(true);
            setManualLocale(value);
          }}
        >
          <Select.Trigger
            className="ml-auto py-1 text-sm"
            aria-label={localeSelectorTrigger.value}
          >
            <Select.Value placeholder={selectPlaceholder.value} />
          </Select.Trigger>
          <Select.Content>
            {availableLocales.map((locale) => (
              <Select.Item key={locale} value={locale}>
                {getLocaleName(locale)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
    </div>
  );
};
