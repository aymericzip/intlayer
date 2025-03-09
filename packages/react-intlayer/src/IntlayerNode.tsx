import type { NodeProps } from '@intlayer/core';
import {
  type PropsWithChildren,
  type ReactNode,
  type ReactElement,
  isValidElement,
} from 'react';

export type IntlayerNode<T = NodeProps['content']> = ReactNode & {
  value: T;
};

export const rendererIntlayerNode = <
  T extends number | string | boolean | undefined | null,
>({
  value,
  children,
}: PropsWithChildren<{
  value: T;
}>): IntlayerNode => {
  // If children is not a valid ReactElement, wrap it in a fragment
  const element: ReactElement<any> = isValidElement(children) ? (
    children
  ) : (
    <>{children}</>
  );

  // Use React.cloneElement to add the "value" prop to the element
  return { ...element, value };
};
