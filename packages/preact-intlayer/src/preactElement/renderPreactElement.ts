import type { ComponentChild, VNode } from 'preact';
import { createElement } from 'preact/compat';

// This function recursively creates Preact elements from a given JSON-like structure
export const renderPreactElement = (element: VNode<any>) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  const convertChildrenAsArray = (
    element: VNode<{ children?: ComponentChild | ComponentChild[] }>
  ): VNode<{ children?: ComponentChild | ComponentChild[] }> => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: ComponentChild[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children ?? {}).forEach((key) => {
        childrenResult.push(
          renderPreactElement(
            children?.[key as keyof typeof children] as unknown as VNode<any>
          )
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
    element as VNode<{ children?: ComponentChild | ComponentChild[] }>
  );

  const { type, props } = fixedElement;

  // Create and return the Preact element
  return createElement(
    type ?? 'span',
    props,
    ...(props.children as ComponentChild[])
  );
};
