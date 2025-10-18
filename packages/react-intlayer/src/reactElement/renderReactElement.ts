import { createElement, type ReactElement, type ReactNode } from 'react';

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
        const childElement = renderReactElement(
          children?.[
            key as keyof typeof children
          ] as unknown as ReactElement<any>
        );

        // Add key prop if the child is a React element
        if (
          typeof childElement === 'object' &&
          childElement !== null &&
          'type' in childElement
        ) {
          childrenResult.push(
            createElement(
              childElement.type,
              { ...childElement.props, key },
              ...(Array.isArray(childElement.props?.children)
                ? childElement.props.children
                : [childElement.props?.children])
            )
          );
        } else {
          childrenResult.push(childElement);
        }
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
