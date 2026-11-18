import type { JSX } from 'solid-js';

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

  // `Dynamic` is a JSX built-in, auto-imported from the app's web runtime
  return (
    // oxlint-disable-next-line react/jsx-no-undef -- compiler built-in, auto-imported per Solid version
    <Dynamic component={type ?? 'span'} {...props}>
      {props.children}
    </Dynamic>
  );
};
