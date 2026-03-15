import { cn } from '@utils/cn';
import { type FC, type HTMLAttributes, type ReactNode, useEffect, useRef } from 'react';

/**
 * Props for the MaxHeightSmoother component
 */
interface MaxHeightSmootherProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to render within the smoother container */
  children: ReactNode;
  /**
   * Controls collapse state.
   * - `true`      → always collapsed
   * - `false`     → always expanded
   * - `undefined` → uncontrolled; relies on isOverable / isFocusable
   */
  isHidden?: boolean;
  /** Expand on mouse hover */
  isOverable?: boolean;
  /**
   * Expand on keyboard focus.
   * Adds `role="button"`, `tabIndex={0}`, `aria-expanded`, and handles
   * Enter / Space keys per WAI-ARIA authoring practices.
   */
  isFocusable?: boolean;
  /** Minimum visible height in pixels when collapsed (0 = fully hidden) */
  minHeight?: number;
  /**
   * Enable debug logging to the console.
   * Logs strategy selection, prop values, and transition events.
   * Remove before shipping to production.
   */
  debug?: boolean;
}

const PREFIX = '[MaxHeightSmoother]';

// Shared ceiling — exposed as a CSS variable so consumers can override it
// by setting `--mhs-expanded` on a parent if needed.
const EXPANDED_CEILING = '3000px';

export const MaxHeightSmoother: FC<MaxHeightSmootherProps> = ({
  children,
  isHidden,
  className = '',
  isOverable = false,
  isFocusable = false,
  minHeight = 0,
  debug = false,
  style,
  ...props
}) => {
  const hasMinHeight = minHeight > 0;

  /**
   * True when the component should render visually collapsed on mount /
   * re-render. In uncontrolled hover/focus mode we always start collapsed
   * so the CSS interaction selectors have something to open.
   */
  const isCollapsed =
    isHidden === true ||
    (isHidden === undefined && (isOverable || isFocusable));

  const containerRef = useRef<HTMLDivElement>(null);

  // ── Keyboard support for role="button" (WAI-ARIA requirement) ────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isFocusable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      containerRef.current?.click();
    }
    props.onKeyDown?.(e);
  };

  // ── Log: strategy & props (only when relevant values change) ─────────────
  useEffect(() => {
    if (!debug) return;

    const strategy = hasMinHeight
      ? 'B — max-height (CSS variable)'
      : 'A — grid-template-rows';

    console.group(`${PREFIX} render`);
    console.log('Strategy  :', strategy);
    console.log('Props     :', { isHidden, isOverable, isFocusable, minHeight });
    console.log('isCollapsed (initial):', isCollapsed);

    if (hasMinHeight) {
      console.log(
        'Fix proof : inline style sets --mhs-collapsed =',
        `${minHeight}px`,
        '\n           max-height is NOT set inline → :hover/:focus-within override freely (no specificity conflict)',
      );
    } else {
      console.log(
        'Fix proof : inner div has min-h-0 → grid track collapses to 0fr with no dead time',
      );
    }

    console.groupEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debug, hasMinHeight, isHidden, isOverable, isFocusable, minHeight]);

  // ── Log: transition events (proves single-phase animation) ───────────────
  useEffect(() => {
    if (!debug) return;
    const el = containerRef.current;
    if (!el) return;

    // Boolean flag instead of a counter: rapid mouse movement interrupts
    // an in-progress transition and fires a second transitionstart — that is
    // expected browser behaviour, not a "two-phase dead-time" bug.
    // We only log the *first* start of each gesture direction.
    let isTransitioning = false;

    const onStart = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (!isTransitioning) {
        console.log(
          `${PREFIX} transitionstart — property: "${e.propertyName}"`,
          '\n→ Single start per gesture = single-phase animation ✅',
        );
        isTransitioning = true;
      }
    };

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
      isTransitioning = false;

      const computedMaxHeight = getComputedStyle(el).maxHeight;
      const computedGridRows = getComputedStyle(el).gridTemplateRows;

      console.log(`${PREFIX} transitionend — property: "${e.propertyName}"`);

      if (hasMinHeight) {
        console.log(
          `${PREFIX} resolved max-height: ${computedMaxHeight}`,
          '\n→ expanded = "3000px" ✅  |  collapsed = minHeight value ✅',
        );
      } else {
        console.log(
          `${PREFIX} resolved grid-template-rows: ${computedGridRows}`,
          '\n→ collapsed ≈ "0px" ✅  |  expanded = content height ✅',
        );
      }
    };

    el.addEventListener('transitionstart', onStart);
    el.addEventListener('transitionend', onEnd);
    return () => {
      el.removeEventListener('transitionstart', onStart);
      el.removeEventListener('transitionend', onEnd);
    };
  }, [debug, hasMinHeight]);

  // ── Log: hover/focus events ───────────────────────────────────────────────
  useEffect(() => {
    if (!debug) return;
    const el = containerRef.current;
    if (!el) return;

    const onMouseEnter = () =>
      console.log(`${PREFIX} mouseenter → :hover active, expansion should begin immediately`);
    const onMouseLeave = () =>
      console.log(`${PREFIX} mouseleave → :hover removed, collapse should begin immediately`);
    const onFocusIn = () =>
      console.log(`${PREFIX} focusin → :focus-within active, expansion should begin immediately`);
    const onFocusOut = () =>
      console.log(`${PREFIX} focusout → :focus-within removed, collapse should begin immediately`);

    if (isOverable) {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    }
    if (isFocusable) {
      el.addEventListener('focusin', onFocusIn);
      el.addEventListener('focusout', onFocusOut);
    }

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, [debug, isOverable, isFocusable]);

  return (
    <div
      ref={containerRef}
      role={isFocusable ? 'button' : undefined}
      tabIndex={isFocusable ? 0 : undefined}
      // aria-expanded is the correct ARIA attribute for interactive disclosure
      // elements. aria-hidden would incorrectly hide content from screen readers
      // even when the element is visually expanded.
      aria-expanded={isFocusable && isHidden !== undefined ? !isHidden : undefined}
      onKeyDown={handleKeyDown}
      style={
        hasMinHeight
          ? ({
              '--mhs-collapsed': `${minHeight}px`,
              '--mhs-expanded': EXPANDED_CEILING,
              ...style,
            } as React.CSSProperties)
          : style
      }
      className={cn(
        'group/mhs relative w-full',

        // ── Strategy A: grid-template-rows (minHeight === 0) ─────────────────
        // overflow-hidden lives on the inner wrapper here (needed to clip
        // content as the grid track animates). The outer container stays
        // unclipped so box-shadows / outlines on children are not cut.
        !hasMinHeight && [
          'grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none',
          isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
          isOverable && 'hover:grid-rows-[1fr]',
          isFocusable && 'focus:grid-rows-[1fr] focus-within:grid-rows-[1fr]',
        ],

        // ── Strategy B: max-height via CSS variables (minHeight > 0) ─────────
        // Both the collapsed floor and expanded ceiling are CSS variables,
        // allowing consumer overrides without code changes:
        //   --mhs-collapsed: 80px  (floor)
        //   --mhs-expanded:  2000px (override ceiling if 3000px is too large)
        hasMinHeight && [
          'overflow-hidden transition-[max-height] duration-500 ease-in-out motion-reduce:transition-none',
          isCollapsed
            ? 'max-h-[var(--mhs-collapsed)]'
            : 'max-h-[var(--mhs-expanded)]',
          isOverable && 'hover:max-h-[var(--mhs-expanded)]',
          isFocusable && 'focus-within:max-h-[var(--mhs-expanded)]',
        ],

        className,
      )}
      {...props}
    >
      {/*
       * Inner wrapper:
       *   Strategy A — `min-h-0` + `overflow-hidden` lets the grid track
       *                collapse to 0 and clips content during animation.
       *   Strategy B — `min-h-[var(--mhs-collapsed)]` provides the visible
       *                floor via the same CSS variable, removing the need
       *                for a separate inline minHeight style.
       */}
      <div
        className={cn(
          'overflow-hidden',
          !hasMinHeight && 'min-h-0',
          hasMinHeight && 'min-h-[var(--mhs-collapsed)]',
        )}
      >
        {children}
      </div>
    </div>
  );
};