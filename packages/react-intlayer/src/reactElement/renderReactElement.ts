/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactElement, type ReactNode, createElement } from 'react';

// This function recursively creates React elements from a given JSON-like structure
export const renderReactElement = (element: ReactElement<any>) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  const convertChildrenAsArray = (
    element: ReactElement<{ children?: ReactNode }>
  ): ReactElement<{ children?: ReactNode }> => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: ReactNode[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children ?? {}).forEach((key) => {
        childrenResult.push(
          renderReactElement((children ?? {})[key as keyof typeof children])
        );
      });

      return {
        ...element,
        props: { ...element.props, children: childrenResult },
      };
    }

    return {
      ...element,
      props: { ...element.props, children: element.props?.children ?? [] },
    };
  };

  const fixedElement = convertChildrenAsArray(
    element as ReactElement<{ children?: ReactNode }>
  );

  const { type, props } = fixedElement;

  // Create and return the React element
  return createElement(
    type ?? 'span',
    props,
    ...(props.children as ReactNode[])
  );
};
