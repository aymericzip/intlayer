import { createElement } from 'react';
import type { FC, HTMLAttributes, JSX } from 'react';
import { compilerCore, RuleType, sanitizer, type MarkdownProcessorOptions } from '@intlayer/core/src/markdown/processor';

export { RuleType, sanitizer };

export const compiler = (
  markdown: string = '',
  options: MarkdownProcessorOptions = {}
): JSX.Element => {
  const render = compilerCore(markdown, options);
  return render(((type: any, props: any, ...children: any[]) => createElement(type, props, ...(children.length === 1 ? [children[0]] : children))) as any) as unknown as JSX.Element;
};

export const MarkdownProcessor: FC<
  Omit<HTMLAttributes<Element>, 'children'> & {
    children: string;
    options?: MarkdownProcessorOptions;
  }
> = ({ children = '', options, ...props }) => {
  const el = compiler(children, options);
  return createElement((el as any).type ?? 'div', { ...(el as any).props, ...props });
};