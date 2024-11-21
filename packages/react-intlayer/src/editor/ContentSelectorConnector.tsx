'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {
  ContentSelectorWrapper,
  ContentSelectorWrapperProps,
} from './ContentSelectorWrapper';

type ContentSelectorContextValue = {
  state: {
    ContentSelectorWrapper: typeof ContentSelectorWrapper;
  };
  setState: (value: ContentSelectorContextValue['state']) => void;
};

export const ContentSelectorContext =
  createContext<ContentSelectorContextValue>({
    state: { ContentSelectorWrapper },
    setState: () => {},
  });

export const useContentSelectorContext = () =>
  useContext(ContentSelectorContext);

export const ContentSelectorProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState({
    // Add your default state here
    ContentSelectorWrapper,
  });

  return (
    <ContentSelectorContext.Provider value={{ state, setState }}>
      {children}
    </ContentSelectorContext.Provider>
  );
};

export const ContentSelectorConnector: FC<ContentSelectorWrapperProps> = (
  props
) => {
  const { ContentSelectorWrapper } = useContentSelectorContext().state;

  return <ContentSelectorWrapper {...props} />;
};
