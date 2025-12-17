import { Terminal } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { type FC, useState } from 'react';

type TestSectionProps = {
  scrollProgress: number;
};

export const TestSection: FC<TestSectionProps> = ({ scrollProgress }) => {
  const content = useIntlayer('test-section');
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const nbItems = content.length - 2;
  const itemsToShow = Math.floor(nbItems * scrollProgress + 1);
  const [additionalContent, setAdditionalContent] = useState('');

  const handleSubmit = (value: string) => {
    setAdditionalContent((prev) => (prev ? `${prev}\n${value}` : value));
  };

  const displayContent = content
    .map((item: string, index: number) => {
      if (index < itemsToShow) {
        return item.value; // Keep the value to return IntlayerNode as a string
      }
      return '';
    })
    .join('\n');

  const fullContent = additionalContent
    ? `${displayContent}\n${additionalContent}`
    : displayContent;

  return (
    <Terminal
      isDarkMode={isDarkMode}
      title="intlayer test"
      className="max-w-xl flex-1 scale-90 overflow-auto text-xs"
      onSubmit={handleSubmit}
    >
      {fullContent}
    </Terminal>
  );
};
