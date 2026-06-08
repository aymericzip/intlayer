import { type ComponentChild, createElement, type VNode } from 'preact';

// This function recursively creates Preact elements from a given JSON-like structure
export const renderPreactElement = (element: VNode<any>): any => {
  if (element === null || typeof element !== 'object') {
    return element;
  }

  const convertChildrenAsArray = (
    element: VNode<{ children?: ComponentChild | ComponentChild[] }>
  ): VNode<{ children?: ComponentChild | ComponentChild[] }> => {
    const children = element.props?.children;

    if (Array.isArray(children)) {
      const childrenResult: ComponentChild[] = children.map((child) =>
        renderPreactElement(child as VNode<any>)
      );

      return {
        ...element,
        props: { ...element.props, children: childrenResult },
      };
    } else if (typeof children !== 'undefined' && children !== null) {
      const renderedChild = renderPreactElement(children as VNode<any>);
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
    element as VNode<{ children?: ComponentChild | ComponentChild[] }>
  );

  const { type, props } = fixedElement;

  // Create and return the Preact element
  return createElement(
    (type as any) ?? 'span',
    props as any,
    ...(props.children as ComponentChild[])
  );
};
