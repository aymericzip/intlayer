import type { CreateElement } from './types';

export const createMarkdownCompiler = (createElement: CreateElement) => {
  return (markdown: string, options?: any) => {
    // TEMPORARY placeholder
    // later you move the real compiler logic here

    return createElement('div', null, [markdown]);
  };
};
