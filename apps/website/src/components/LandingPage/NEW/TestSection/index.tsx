import { Terminal } from '@intlayer/design-system/terminal';
import { useTheme } from 'next-themes';
import { type FC, useEffect, useState } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';

export const TestSection: FC = () => {
  const content = useIntlayer('test-section');
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const nbItems = content.length - 2;
  const [itemsToShow, setItemsToShow] = useState(0);
  const [additionalContent, setAdditionalContent] = useState('');

  useEffect(() => {
    if (itemsToShow >= nbItems) return;

    const timeout = setTimeout(() => {
      setItemsToShow((prev) => prev + 1);
    }, 150);

    return () => clearTimeout(timeout);
  }, [itemsToShow, nbItems]);

  const handleSubmit = (value: string) => {
    setAdditionalContent((prev) => (prev ? `${prev}\n${value}` : value));
  };

  const displayContent = content
    .map((item: IntlayerNode, index: number) => {
      if (index < itemsToShow) {
        return item.value;
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
      className="w-full flex-1 overflow-auto text-xs"
      onSubmit={handleSubmit}
    >
      {fullContent}
    </Terminal>
  );
};
