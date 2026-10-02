import { cn } from '@intlayer/design-system/utils';
import { type FC, useEffect, useState } from 'react';

/** Fixed brand suffix, never rewritten. */
const TITLE_SUFFIX = 'Layer';
/** Last segment of the loop, glued to the suffix: "IntLayer". */
const BRAND_SEGMENT = 'Int';

/** Time the server-rendered phrase stays untouched before the first rewrite. */
const INITIAL_HOLD_MS = 1000;
/** Time a fully typed phrase stays before being erased. */
const PHRASE_HOLD_MS = 2200;
const TYPE_STEP_MS = 70;
const ERASE_STEP_MS = 35;

type TypewriterPhase = 'holding' | 'erasing' | 'typing';

type TypewriterState = {
  segmentIndex: number;
  visibleLength: number;
  phase: TypewriterPhase;
};

/** Number of leading characters shared by two strings. */
const getCommonPrefixLength = (first: string, second: string): number => {
  let index = 0;

  while (
    index < first.length &&
    index < second.length &&
    first[index] === second[index]
  ) {
    index++;
  }

  return index;
};

type TypewriterTitleProps = {
  /** Static title, rendered when `words` is empty. */
  title: string;
  /**
   * Words typed before "Layer". The first one is server-rendered and must be
   * the longest, so its box reserves the space for the others (no CLS).
   */
  words: string[];
  className?: string;
};

/**
 * Hero title rewriting the word before "Layer" letter by letter.
 *
 * SSR and the first client render output the plain first phrase, so the LCP
 * paint and hydration are identical to static text. The loop only starts
 * after `INITIAL_HOLD_MS`, and never for `prefers-reduced-motion` users.
 */
export const TypewriterTitle: FC<TypewriterTitleProps> = ({
  title,
  words,
  className,
}) => {
  const segments = [...words, BRAND_SEGMENT];
  const isAnimated = words.length > 0;

  const [state, setState] = useState<TypewriterState>({
    segmentIndex: 0,
    visibleLength: segments[0].length,
    phase: 'holding',
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isAnimated) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timeout = window.setTimeout(
      () => setHasStarted(true),
      INITIAL_HOLD_MS
    );

    return () => window.clearTimeout(timeout);
  }, [isAnimated]);

  const currentSegment = segments[state.segmentIndex];
  const nextSegmentIndex = (state.segmentIndex + 1) % segments.length;
  const nextSegment = segments[nextSegmentIndex];

  useEffect(() => {
    if (!hasStarted) return;

    const getNextState = (): TypewriterState => {
      if (state.phase === 'holding') return { ...state, phase: 'erasing' };

      if (state.phase === 'erasing') {
        // Erase only what differs from the next segment, then retype from there
        const sharedLength = getCommonPrefixLength(currentSegment, nextSegment);

        return state.visibleLength > sharedLength
          ? { ...state, visibleLength: state.visibleLength - 1 }
          : { ...state, segmentIndex: nextSegmentIndex, phase: 'typing' };
      }

      return state.visibleLength < currentSegment.length
        ? { ...state, visibleLength: state.visibleLength + 1 }
        : { ...state, phase: 'holding' };
    };

    const delayByPhase: Record<TypewriterPhase, number> = {
      holding: PHRASE_HOLD_MS,
      erasing: ERASE_STEP_MS,
      typing: TYPE_STEP_MS,
    };

    const timeout = window.setTimeout(
      () => setState(getNextState()),
      delayByPhase[state.phase]
    );

    return () => window.clearTimeout(timeout);
  }, [hasStarted, state, currentSegment, nextSegment, nextSegmentIndex]);

  if (!isAnimated) return <h1 className={className}>{title}</h1>;

  const isHoldingInitial = !hasStarted;
  const visibleWord = currentSegment.slice(0, state.visibleLength);
  // "Int" keeps the title color, the rest of the word is rewritten
  const visibleBrand = visibleWord.slice(0, BRAND_SEGMENT.length);
  const visibleRest = visibleWord.slice(BRAND_SEGMENT.length);
  // Only the brand segment is glued to the suffix: "IntLayer"
  const separator = currentSegment === BRAND_SEGMENT ? '' : ' ';

  // Before a space, the negative right margin makes the caret zero-width so
  // it sits inside the space gap and the title keeps its plain-text width
  const caret = hasStarted ? (
    <span
      aria-hidden
      className={cn(
        'ms-0.5 inline-block h-[0.9em] w-0.75 animate-pulse bg-current align-[-0.1em]',
        separator ? '-me-1.25' : 'me-0.5'
      )}
    />
  ) : null;

  return (
    <h1 className={cn('grid', className)}>
      {/* Reserves the first (longest) phrase's box while the text changes */}
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 select-none"
      >
        {`${segments[0]} ${TITLE_SUFFIX}`}
      </span>
      <span className="col-start-1 row-start-1">
        {isHoldingInitial ? (
          `${segments[0]} ${TITLE_SUFFIX}`
        ) : (
          <>
            {visibleBrand}
            {/* Each letter fades in from the dimmed color as soon as it is typed
                (@starting-style), so the color follows the caret left to right */}
            {Array.from(visibleRest, (letter, letterIndex) => (
              <span
                // Index key: kept letters stay mounted, only new ones animate
                // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity
                key={letterIndex}
                className={cn(
                  'starting:text-text/60 transition-colors duration-500 ease-out',
                  // Delayed so the color trails a few letters behind the caret
                  state.phase === 'erasing' ? 'text-text/60' : 'delay-200'
                )}
              >
                {letter}
              </span>
            ))}
            {caret}
            {separator}
            {TITLE_SUFFIX}
          </>
        )}
      </span>
    </h1>
  );
};
