import { createElement, type ReactElement, type ReactNode } from 'react';

// This function recursively creates React elements from a given JSON-like structure
export const renderReactElement = (element: ReactElement<any>): any => {
  if (element === null || typeof element !== 'object') {
    return element;
  }

  const convertChildrenAsArray = (
    element: ReactElement<{ children?: ReactNode }>
  ): ReactElement<{ children?: ReactNode }> => {
    const children = element.props?.children;

    if (Array.isArray(children)) {
      const childrenResult: ReactNode[] = children.map((child, index) => {
        const renderedChild = renderReactElement(child as ReactElement<any>);

        if (
          typeof renderedChild === 'object' &&
          renderedChild !== null &&
          'type' in renderedChild
        ) {
          const childElement = renderedChild as ReactElement<any>;
          return createElement(
            childElement.type,
            { ...childElement.props, key: index },
            ...(Array.isArray(childElement.props?.children)
              ? childElement.props.children
              : typeof childElement.props?.children !== 'undefined'
                ? [childElement.props.children]
                : [])
          );
        }
        return renderedChild;
      });

      return {
        ...element,
        props: { ...element.props, children: childrenResult },
      };
    } else if (typeof children !== 'undefined' && children !== null) {
      const renderedChild = renderReactElement(children as ReactElement<any>);
      return {
        ...element,
        props: { ...element.props, children: [renderedChild] },
      };
    }

    return {
      ...element,
      props: { ...element.props, children: [] },
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
