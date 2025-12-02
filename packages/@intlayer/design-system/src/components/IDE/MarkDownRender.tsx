import type { ComponentProps, ComponentPropsWithoutRef, FC } from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';
import { MarkdownProcessor } from 'react-intlayer/markdown';
import { Code } from './Code';

type MarkdownRendererProps = {
  isDarkMode?: boolean;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
}) => (
  <MarkdownProcessor
    options={{
      overrides: {
        code: {
          component: (props: ComponentProps<typeof Code>) => (
            <Code
              {...props}
              isDarkMode={isDarkMode}
              language={
                props.className?.replace('lang-', '') as BundledLanguage
              }
              showHeader={false}
              className="text-xs leading-5"
            />
          ),
        },
        pre: (props: ComponentPropsWithoutRef<'pre'>) => props.children,
      },
    }}
  >
    {children ?? ''}
  </MarkdownProcessor>
);
