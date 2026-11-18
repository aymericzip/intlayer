import { cn } from '@utils/cn';
import { composeRefs } from '@utils/composeRefs';
import {
  Children,
  type CSSProperties,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';

type UnknownProps = Record<string, unknown>;

type EventHandler = (...args: unknown[]) => unknown;

export type SlotProps<TElement extends HTMLElement = HTMLElement> =
  HTMLAttributes<TElement> & {
    children?: ReactNode;
    ref?: Ref<TElement>;
  };

const isEventHandlerKey = (key: string): boolean => /^on[A-Z]/.test(key);

/**
 * Merges the props of a `Slot` into its child's props: the child wins, except
 * for event handlers (both run, child first), `style` and `className`.
 */
export const mergeSlotProps = (
  slotProps: UnknownProps,
  childProps: UnknownProps
): UnknownProps => {
  const mergedProps: UnknownProps = { ...slotProps, ...childProps };

  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    if (isEventHandlerKey(key)) {
      mergedProps[key] =
        typeof slotValue === 'function' && typeof childValue === 'function'
          ? (...args: unknown[]) => {
              const result = (childValue as EventHandler)(...args);
              (slotValue as EventHandler)(...args);
              return result;
            }
          : (childValue ?? slotValue);
    } else if (key === 'style') {
      mergedProps.style = {
        ...(slotValue as CSSProperties | undefined),
        ...(childValue as CSSProperties | undefined),
      };
    } else if (key === 'className') {
      mergedProps.className = cn(
        slotValue as string | undefined,
        childValue as string | undefined
      );
    }
  }

  return mergedProps;
};

/**
 * Renders its single child element, merging its own props and ref into it.
 * Powers the `asChild` pattern.
 *
 * @example
 * <Slot aria-invalid onClick={track}>
 *   <input />
 * </Slot>
 */
export const Slot = <TElement extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...slotProps
}: SlotProps<TElement>) => {
  const child = Children.only(children);

  if (!isValidElement<UnknownProps & { ref?: Ref<TElement> }>(child)) {
    return null;
  }

  const childElement = child as ReactElement<
    UnknownProps & { ref?: Ref<TElement> }
  >;

  return cloneElement(childElement, {
    ...mergeSlotProps(slotProps, childElement.props),
    ref: ref
      ? composeRefs(ref, childElement.props.ref)
      : childElement.props.ref,
  });
};
