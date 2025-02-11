'use client';

import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

type MarkdownContextValue = {
  renderMarkdown: (markdown: string) => ReactNode;
};

type MarkdownProviderProps = PropsWithChildren<MarkdownContextValue>;

const MarkdownContext = createContext<MarkdownContextValue>({
  renderMarkdown: (markdown: string) => markdown,
});

export const useMarkdownContext = () => useContext(MarkdownContext);

export const MarkdownProvider: FC<MarkdownProviderProps> = ({
  children,
  renderMarkdown,
}) => <MarkdownContext value={{ renderMarkdown }}>{children}</MarkdownContext>;
