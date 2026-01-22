import type { ComponentProps, ComponentPropsWithoutRef, FC } from 'react';
import { MarkdownRenderer as MarkdownRendererIntlayer } from 'react-intlayer';
import type { BundledLanguage } from 'shiki/bundle/web';
import { Code } from './Code';

type MarkdownRendererProps = {
  isDarkMode?: boolean;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
}) => (
  <MarkdownRendererIntlayer
    components={{
      code: {
        component: (props: ComponentProps<typeof Code>) => (
          <Code
            {...props}
            isDarkMode={isDarkMode}
            language={props.className?.replace('lang-', '') as BundledLanguage}
            showHeader={false}
            className="text-xs leading-5"
          />
        ),
      },
      pre: (props: ComponentPropsWithoutRef<'pre'>) => props.children,
    }}
  >
    {children ?? ''}
  </MarkdownRendererIntlayer>
);
