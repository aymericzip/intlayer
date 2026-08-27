'use client';

import { Button } from '@components/Button';
import { KeyboardShortcut } from '@components/KeyboardShortcut';
import { Popover } from '@components/Popover';
import { cn } from '@utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Children,
  createContext,
  type FC,
  type HTMLAttributes,
  isValidElement,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type TouchEventHandler,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';

// ------------------------------------------------------------------
// Configuration
// ------------------------------------------------------------------
const SWIPE_THRESHOLD_DIVISOR = 5;
const TRANSITION_DELAY_MS = 50;
const CONTAINER_VERTICAL_PADDING_PX = 40;
const CONTAINER_MIN_HEIGHT_PX = 400;

/**
 * Border-box height carried by a `ResizeObserverEntry`, equivalent to
 * `offsetHeight` but already computed by the browser during layout, so reading
 * it never forces a reflow.
 */
const getEntryBlockSize = (entry: ResizeObserverEntry): number =>
  entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;

// ------------------------------------------------------------------
// Context Definition
// ------------------------------------------------------------------
type CarouselContextValue = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  totalItems: number;
  handlePrev: () => void;
  handleNext: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel');
  }
  return context;
};

// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const getCardStyle = (index: number, displayedIndex: number) => {
  const diff = Math.abs(index - displayedIndex);
  switch (diff) {
    case 0:
      return 'opacity-100 z-40';
    case 1:
      return 'opacity-75 z-30 cursor-pointer';
    case 2:
      return 'opacity-50 z-20 pointer-events-none';
    default:
      return 'opacity-0 z-10 pointer-events-none';
  }
};

const getCardScale = (index: number, displayedIndex: number) => {
  const diff = Math.abs(index - displayedIndex);
  switch (diff) {
    case 0:
      return 1;
    case 1:
      return 0.9;
    case 2:
      return 0.8;
    default:
      return 0.7;
  }
};

// This allows the calculation to work on SSR without hydration mismatch.
// Your original logic: (3 * screenWidth) / 10  === 30% of viewport width
const getCardPositionX = (
  index: number,
  displayedIndex: number,
  containerWidth: number
) => {
  const diff = index - displayedIndex;
  const gapPercentage = containerWidth < 600 ? 0.15 : 0.3; // Dropped to 15% for a tighter cluster
  const step = Math.min(containerWidth * gapPercentage, 300);

  // The 'px' here is mandatory
  return `${diff * step}px`;
};

// ------------------------------------------------------------------
// Sub-Component: Item
// ------------------------------------------------------------------
type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const CarouselItem: FC<CarouselItemProps> & { isCarouselItem: true } =
  Object.assign(
    ({ children, className, ...props }: CarouselItemProps) => (
      <div className={cn('size-full', className)} {...props}>
        {children}
      </div>
    ),
    { isCarouselItem: true as const }
  );

// ------------------------------------------------------------------
// Sub-Component: Indicators (Controller)
// ------------------------------------------------------------------
type CarouselIndicatorsProps = HTMLAttributes<HTMLDivElement> & {
  disableKeyboardShortcuts?: boolean;
};

const CarouselIndicators: FC<CarouselIndicatorsProps> = ({
  className,
  disableKeyboardShortcuts = false,
  ...props
}) => {
  const {
    selectedIndex,
    setSelectedIndex,
    totalItems,
    handlePrev,
    handleNext,
  } = useCarousel();
  const { goToSlide, previousSlide, nextSlide } = useIntlayer('carousel');

  if (totalItems <= 1) return null;

  return (
    <div
      className={cn(
        'absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center gap-2',
        className
      )}
      {...props}
    >
      <Popover identifier="carousel-prev">
        <Button
          variant="hoverable"
          color="foreground"
          label={previousSlide.value}
          roundedSize="full"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          Icon={ChevronLeft}
          size="icon-md"
          disabled={selectedIndex === 0}
        />

        <Popover.Detail identifier="carousel-prev">
          <div className="flex items-center gap-2 p-2">
            <span className="whitespace-nowrap text-muted-foreground text-xs">
              {previousSlide.value}
            </span>
            <KeyboardShortcut
              shortcut="ArrowLeft"
              disabled={disableKeyboardShortcuts}
              size="sm"
              onTriggered={handlePrev}
            />
          </div>
        </Popover.Detail>
      </Popover>

      {Array.from({ length: totalItems }).map((_, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(index);
            }}
            aria-label={goToSlide({ index: index + 1 }).value}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
              isActive ? 'scale-110 bg-text' : 'bg-text/20 hover:bg-text/40'
            )}
          />
        );
      })}

      <Popover identifier="carousel-next">
        <Button
          variant="hoverable"
          color="foreground"
          roundedSize="full"
          label={nextSlide.value}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          Icon={ChevronRight}
          size="icon-md"
          disabled={selectedIndex === totalItems - 1}
        />

        <Popover.Detail identifier="carousel-next">
          <div className="flex items-center gap-2 p-2">
            <span className="whitespace-nowrap text-muted-foreground text-xs">
              {nextSlide.value}
            </span>
            <KeyboardShortcut
              shortcut="ArrowRight"
              size="sm"
              onTriggered={handleNext}
              disabled={disableKeyboardShortcuts}
            />
          </div>
        </Popover.Detail>
      </Popover>
    </div>
  );
};

// ------------------------------------------------------------------
// Main Component: Carousel Root
// ------------------------------------------------------------------
type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
};

const partitionCarouselChildren = (
  children: ReactNode[]
): [ReactElement[], ReactNode[]] => {
  const slides: ReactElement[] = [];
  const others: ReactNode[] = [];

  children.forEach((child) => {
    if (
      isValidElement(child) &&
      (child.type === CarouselItem ||
        (child.type as { isCarouselItem?: boolean }).isCarouselItem === true)
    ) {
      slides.push(child);
    } else {
      others.push(child);
    }
  });

  return [slides, others];
};

const CarouselRoot: FC<CarouselProps> = ({
  children,
  className,
  initialIndex = 0,
  onIndexChange,
  ...props
}) => {
  const allChildren = Children.toArray(children);
  const [slides, others] = partitionCarouselChildren(allChildren);
  const totalItems = slides.length;

  // State Management
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
  const [displayedIndex, setDisplayedIndex] = useState<number>(initialIndex);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Drag State
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemHeightsRef = useRef<Map<Element, number>>(new Map());

  // Navigation Logic
  const handleSwitchItem = (diff: number) => {
    if (containerWidth === 0) return;

    // Use container width for the threshold
    const swipeStep = containerWidth / SWIPE_THRESHOLD_DIVISOR;
    const numSwipe = Math.round(diff / swipeStep);

    if (Math.abs(numSwipe) >= 1) {
      const newIndex = displayedIndex - numSwipe;
      const clampedIndex = Math.max(0, Math.min(newIndex, totalItems - 1));

      if (clampedIndex !== selectedIndex) {
        setSelectedIndex(clampedIndex);
        setStartX((prev) => prev + diff);
      }
    }
  };

  const handleNext = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, totalItems - 1));
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  // Input Handlers
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) handleSwitchItem(e.clientX - startX);
  };
  const handleDragEnd = () => setIsDragging(false);
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0]!.clientX);
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) handleSwitchItem(e.touches[0]!.clientX - startX);
  };

  // Effects
  useEffect(() => {
    if (selectedIndex) onIndexChange?.(selectedIndex);
  }, [selectedIndex, onIndexChange]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (selectedIndex !== displayedIndex) {
      interval = setInterval(() => {
        setDisplayedIndex((prev) => {
          if (prev === selectedIndex) {
            clearInterval(interval);
            return prev;
          }
          return prev < selectedIndex ? prev + 1 : prev - 1;
        });
      }, TRANSITION_DELAY_MS);
    }
    return () => clearInterval(interval);
  }, [selectedIndex, displayedIndex]);

  /**
   * Tracks the container width and the height of the tallest slide.
   *
   * The container height is the *output* of this measurement, so the observer
   * must never read geometry back from the DOM: React commits the new inline
   * height between two observer callbacks, and every read after that commit is
   * a forced reflow. `ResizeObserverEntry` already carries the boxes the
   * browser computed during layout, which are free to read.
   */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = itemsRef.current.filter((item) => item !== null);
    const itemHeights = itemHeightsRef.current;

    const publishMaxHeight = () => {
      const maxHeight = Math.max(0, ...itemHeights.values());

      if (maxHeight > 0) {
        setContainerHeight(maxHeight + CONTAINER_VERTICAL_PADDING_PX);
      }
    };

    // First pass: every read happens before any state write, so the initial
    // measurement costs a single layout.
    const initialWidth = container.clientWidth;
    items.forEach((item) => {
      itemHeights.set(item, item.offsetHeight);
    });

    setContainerWidth(initialWidth);
    publishMaxHeight();

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === container) {
          setContainerWidth(entry.contentRect.width);
          return;
        }

        itemHeights.set(entry.target, getEntryBlockSize(entry));
      });

      publishMaxHeight();
    });

    observer.observe(container);
    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
      itemHeights.clear();
    };
  }, [totalItems]);

  return (
    <CarouselContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        totalItems,
        handlePrev,
        handleNext,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative flex w-full cursor-grab select-none items-center overflow-hidden pb-4 outline-none transition-[height] duration-300 ease-in-out focus:outline-none focus:outline-none focus:ring-0 active:cursor-grabbing',
          'max-w-350',
          className
        )}
        style={{
          height: containerHeight > 0 ? containerHeight : 'auto',
          minHeight: `${CONTAINER_MIN_HEIGHT_PX}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        role="region"
        aria-label="Carousel"
        {...props}
      >
        {slides.map((child, index) => {
          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              // FIX 2: Removed isMounted checks and invisible classes.
              // CSS units allow correct SSR rendering.
              className={cn(
                'absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out',
                'outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                getCardStyle(index, displayedIndex)
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(index);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedIndex(index);
              }}
              style={{
                transform: `
                  translateX(${getCardPositionX(
                    index,
                    displayedIndex,
                    containerWidth
                  )})
                  scale(${getCardScale(index, displayedIndex)})
                `,
              }}
            >
              {child}
            </div>
          );
        })}

        {others}
      </div>
    </CarouselContext.Provider>
  );
};

export const Carousel = Object.assign(CarouselRoot, {
  Item: CarouselItem,
  Indicators: CarouselIndicators,
});
