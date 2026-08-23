'use client';

import { H3 } from '@intlayer/design-system/headers';
import { Select } from '@intlayer/design-system/select';
import { getLocaleName } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useState } from 'react';

type VisualEditorSectionProps = {
  scrollProgress: number;
};

/**
 * Maps the section's scroll progress onto one of the configured locales, so the
 * demo cycles through the whole list as it scrolls by.
 *
 * Derived from `availableLocales` rather than hardcoded: a dictionary is only
 * compiled for the locales the app declares, so naming any other one leaves the
 * dynamic loader with no chunk to import.
 *
 * @param scrollProgress - Section progress, 0 at its top and 1 at its bottom.
 * @param availableLocales - The locales declared by the Intlayer config.
 */
const getScrolledLocale = (
  scrollProgress: number,
  availableLocales: readonly string[]
): string | undefined => {
  const index = Math.floor(scrollProgress * availableLocales.length);

  return availableLocales[
    Math.min(Math.max(index, 0), availableLocales.length - 1)
  ];
};

export const VisualEditorSection: FC<VisualEditorSectionProps> = ({
  scrollProgress,
}) => {
  const { locale: pageLocale, availableLocales } = useLocale();
  const [manualLocale, setManualLocale] = useState<string>();

  const locale =
    manualLocale ??
    getScrolledLocale(scrollProgress, availableLocales) ??
    pageLocale;

  const { title, paragraph, selectPlaceholder, localeSelectorTrigger } =
    useIntlayer('compiler-section', locale);

  return (
    <div className="relative z-0 flex size-full flex-col justify-center gap-10 overflow-hidden rounded-r-2xl bg-neutral-50 p-6 text-center dark:bg-neutral-950">
      <H3>{title}</H3>
      <p className="text-neutral text-sm">{paragraph}</p>
      <div className="absolute right-6 bottom-6">
        <Select value={locale} onValueChange={setManualLocale}>
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
