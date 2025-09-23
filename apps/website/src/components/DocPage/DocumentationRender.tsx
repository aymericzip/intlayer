'use client';

import { MarkdownRenderer } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useLocale } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { SectionScroller } from './SectionScroller';

type DocumentationRenderProps = {
  children: string;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
}) => {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';
  return (
    <div className="flex flex-col gap-8 p-10 md:px-0">
      <MarkdownRenderer
        isDarkMode={isDarkMode}
        locale={locale}
        options={{
          wrapper: ({ className, ...props }) => (
            <>
              <SectionScroller />
              <div
                className={cn('flex flex-col gap-8 py-10', className)}
                {...props}
              />
            </>
          ),
        }}
      >
        {children}
      </MarkdownRenderer>
    </div>
  );
};
