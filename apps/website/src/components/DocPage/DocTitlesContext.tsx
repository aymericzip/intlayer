import { useGetElementById } from '@intlayer/design-system/hooks';
import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
} from 'react';
import { useActiveSection } from './useActiveSection';
import { useTitlesTree } from './useTitlesTree';

export type DocTitlesContextValue = {
  topLevelHeadings: HTMLElement[];
  headingMap: Map<HTMLElement, HTMLElement[]>;
  headingTexts: Map<HTMLElement, string>;
  isLoading: boolean;
  activeParent: HTMLElement | null;
  activeChild: HTMLElement | null;
};

const defaultContextValue: DocTitlesContextValue = {
  topLevelHeadings: [],
  headingMap: new Map(),
  headingTexts: new Map(),
  isLoading: false,
  activeParent: null,
  activeChild: null,
};

const DocTitlesContext =
  createContext<DocTitlesContextValue>(defaultContextValue);

export type DocTitlesProviderProps = {
  children: ReactNode;
  contentId?: string;
  levels?: number[];
};

export const DocTitlesProvider: FC<DocTitlesProviderProps> = ({
  children,
  contentId = 'content',
  levels = [2, 3],
}) => {
  const { topLevelHeadings, headingMap, headingTexts, isLoading } =
    useTitlesTree({
      levels,
      contentId,
    });

  const contentElement = useGetElementById(contentId);

  const { activeParent, activeChild } = useActiveSection({
    contentElement,
    headings: topLevelHeadings,
    headingMap,
  });

  const value = useMemo(
    () => ({
      topLevelHeadings,
      headingMap,
      headingTexts,
      isLoading,
      activeParent,
      activeChild,
    }),
    [
      topLevelHeadings,
      headingMap,
      headingTexts,
      isLoading,
      activeParent,
      activeChild,
    ]
  );

  return (
    <DocTitlesContext.Provider value={value}>
      {children}
    </DocTitlesContext.Provider>
  );
};

export const useDocTitles = (): DocTitlesContextValue =>
  useContext(DocTitlesContext);
