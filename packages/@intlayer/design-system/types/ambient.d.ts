declare module 'react' {
  export type ComponentProps<T> = any;
  export type ComponentPropsWithoutRef<T> = any;
  export type PropsWithChildren<P = {}> = P & { children?: any };
  export type ReactNode = any;
  export type FC<P = {}> = (props: P) => any;
  export const Fragment: any;
  export function createElement(type: any, props?: any, ...children: any[]): any;
  export class Component<P = {}, S = {}> {}
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'shiki/bundle/web' {
  export type BundledLanguage = string;
}

declare module '@intlayer/types' {
  export type LocalesValues = string;
}

declare module 'react-intlayer/markdown' {
  export type MarkdownProcessorOptions = any;
  export const RuleType: Record<string, string>;
  export const sanitizer: (input: string) => string | null;
  export const compiler: (markdown?: string, options?: MarkdownProcessorOptions) => any;
  export const MarkdownProcessor: any;
}

declare module 'node:fs' {
  export const readFileSync: any;
}

declare module '@testing-library/react' {
  export const render: any;
  export const screen: any;
}

declare module 'react-dom' {
  export const createPortal: any;
}

declare module 'react-dom/client' {
  export const createRoot: any;
}

declare module 'react-dom/test-utils' {
  export const act: any;
}

declare module 'vitest' {
  export const describe: any;
  export const it: any;
  export const expect: any;
  export const beforeEach: any;
}

declare global {
  namespace JSX {
    interface Element {
      props?: any;
    }
  }
}