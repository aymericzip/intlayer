import {
  choiceVariant,
  SwitchSelector,
  type SwitchSelectorChoices,
  type SwitchSelectorSize,
  switchSelectorVariant,
  VerticalSwitchSelector,
} from '@intlayer/design-system/switch-selector';
import { type RefObject, useEffect, useRef, useState } from 'react';

type AdaptiveSwitchSelectorProps<Value extends string> = {
  choices: SwitchSelectorChoices<Value>;
  value: Value;
  onChange: (value: Value) => void;
  size?: SwitchSelectorSize;
};

/**
 * Tells whether the natural width of `measuredRef` fits in `containerRef`.
 * Reads sizes from the ResizeObserver entries only (no forced reflow).
 * Defaults to `true` so the server render and first paint stay horizontal.
 */
const useFitsHorizontally = (
  containerRef: RefObject<HTMLElement | null>,
  measuredRef: RefObject<HTMLElement | null>
): boolean => {
  const [fitsHorizontally, setFitsHorizontally] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const measured = measuredRef.current;

    if (!container || !measured) return;

    let availableWidth = 0;
    let requiredWidth = 0;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width =
          entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;

        if (entry.target === container) availableWidth = width;
        else requiredWidth = width;
      }

      // Both sizes are reported in the first callback; skip until then.
      if (availableWidth === 0 || requiredWidth === 0) return;

      setFitsHorizontally(requiredWidth <= availableWidth);
    });

    observer.observe(container, { box: 'content-box' });
    observer.observe(measured);

    return () => observer.disconnect();
  }, [containerRef, measuredRef]);

  return fitsHorizontally;
};

/**
 * Switch selector laid out horizontally when every choice fits on one row,
 * vertically otherwise.
 */
export const AdaptiveSwitchSelector = <Value extends string>({
  choices,
  value,
  onChange,
  size = 'sm',
}: AdaptiveSwitchSelectorProps<Value>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measuredRef = useRef<HTMLDivElement>(null);
  const fitsHorizontally = useFitsHorizontally(containerRef, measuredRef);

  const Selector = fitsHorizontally ? SwitchSelector : VerticalSwitchSelector;

  return (
    // Inline-size containment keeps the selector from widening its parent,
    // so the available width never depends on the layout chosen here.
    <div ref={containerRef} className="relative w-full [contain:inline-size]">
      {/*
       * Invisible single-row copy measuring the width the horizontal layout
       * needs. The clipping layer keeps its overflow out of the scrollable area.
       */}
      <div
        aria-hidden
        inert
        className="pointer-events-none invisible absolute inset-0 overflow-hidden"
      >
        <div
          ref={measuredRef}
          className={switchSelectorVariant({
            className: 'absolute inset-s-0 top-0',
          })}
          // Inline so the variant's `w-fit` cannot cap it to the container.
          style={{ width: 'max-content' }}
        >
          <div className="flex flex-row">
            {choices.map((choice) => (
              <span key={choice.value} className={choiceVariant({ size })}>
                {choice.content}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Selector<Value>
        size={size}
        choices={choices}
        value={value}
        onChange={onChange}
        className="w-full"
        color="text"
      />
    </div>
  );
};
