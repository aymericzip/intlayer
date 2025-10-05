import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

// This function recursively creates Solid elements from a given JSON-like structure
export const renderSolidElement = (element: JSX.Element) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  const convertChildrenAsArray = (element: any): any => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: JSX.Element[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children ?? {}).forEach((key) => {
        childrenResult.push(
          renderSolidElement(children?.[key as keyof typeof children])
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

  const fixedElement = convertChildrenAsArray(element);

  const { type, props } = fixedElement;

  // Create and return the Solid element using Dynamic component
  return Dynamic({
    component: type ?? 'span',
    ...props,
    children: props.children,
  });
};
