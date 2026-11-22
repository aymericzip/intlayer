import type { UserAPI } from '@intlayer/backend-contract/user';
import { useIsMounted } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { Tag } from '@intlayer/design-system/tag';
import { cn } from '@intlayer/design-system/utils';
import {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';

/** Space kept between the tag, the button label and the button edge (px). */
const TAG_SPACING = 8;

type LastUsedIndicatorProps = PropsWithChildren<{
  method: NonNullable<UserAPI['lastLoginMethod']>;
}>;

/**
 * Horizontal extent of the visible text rendered inside an element.
 * Element boxes are ignored so flex-grown spans do not inflate the result.
 */
const getTextBounds = (
  element: HTMLElement
): { left: number; right: number } | null => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let left = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.textContent?.trim()) continue;

    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();

    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
  }

  return Number.isFinite(left) ? { left, right } : null;
};

/**
 * Wraps a login button and flags it with a "Last used" tag.
 * The tag sits at the inline end of the button, or below it when it would
 * cover the button label.
 */
export const LastUsedIndicator: FC<LastUsedIndicatorProps> = ({
  method,
  children,
}) => {
  const { label } = useIntlayer('last-used-indicator');
  const isMounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInsideButton, setIsInsideButton] = useState(true);

  const isLastUsed =
    isMounted && getAuthAPI().getAuthClient().isLastUsedLoginMethod(method);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const button = container?.firstElementChild;

    if (!isLastUsed || !(button instanceof HTMLElement)) return;

    const updatePlacement = () => {
      const tag = container?.lastElementChild;
      const textBounds = getTextBounds(button);

      if (!(tag instanceof HTMLElement) || tag === button || !textBounds)
        return;

      const buttonRect = button.getBoundingClientRect();
      const reservedWidth = tag.offsetWidth + TAG_SPACING * 2;
      const isRightToLeft = getComputedStyle(button).direction === 'rtl';

      setIsInsideButton(
        isRightToLeft
          ? buttonRect.left + reservedWidth <= textBounds.left
          : buttonRect.right - reservedWidth >= textBounds.right
      );
    };

    updatePlacement();

    const resizeObserver = new ResizeObserver(updatePlacement);
    resizeObserver.observe(button);

    return () => resizeObserver.disconnect();
  }, [isLastUsed]);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      {children}
      {isLastUsed && (
        <Tag
          color="neutral"
          border="with"
          size="sm"
          className={cn(
            'pointer-events-none border-neutral! bg-background! text-text!',
            isInsideButton
              ? 'absolute end-2 top-1/2 -translate-y-1/2'
              : 'self-end'
          )}
        >
          {label}
        </Tag>
      )}
    </div>
  );
};
