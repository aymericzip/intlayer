import { h } from 'vue';
import { compilerCore, type MarkdownProcessorOptions, RuleType, sanitizer } from '@intlayer/core/src/markdown/processor';

export { RuleType, sanitizer };

export const compileMarkdownVNode = (
  markdown: string = '',
  options: MarkdownProcessorOptions = {}
) => {
  const render = compilerCore(markdown, options);
  return render(((type: any, props: any, ...children: any[]) => h(type as any, props as any, children as any)) as any);
};