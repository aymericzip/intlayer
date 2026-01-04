'use client';

import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@components/Button';
import { KeyboardShortcut } from '@components/KeyboardShortcut';
import { Popover } from '@components/Popover';
// Removed useIsMounted as it is no longer needed for positioning
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
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';

// ------------------------------------------------------------------
// Configuration
// ------------------------------------------------------------------
const SWIPE_THRESHOLD_DIVISOR = 5;
const TRANSITION_DELAY_MS = 50;

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

// FIX 1: Use CSS units (vw) instead of window.innerWidth (pixels)
// This allows the calculation to work on SSR without hydration mismatch.
// Your original logic: (3 * screenWidth) / 10  === 30% of viewport width
const getCardPositionX = (index: number, displayedIndex: number) => {
  const diff = index - displayedIndex;
  return `${diff * 30}vw`;
};

// ------------------------------------------------------------------
// Sub-Component: Item
// ------------------------------------------------------------------
type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const CarouselItem: FC<CarouselItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('h-full w-full', className)} {...props}>
      {children}
    </div>
  );
};

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
        'absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center gap-2',
        className
      )}
      {...props}
    >
      <Popover identifier="carousel-prev">
        <Button
          variant={ButtonVariant.HOVERABLE}
          color={ButtonColor.NEUTRAL}
          label={previousSlide.value}
          roundedSize="full"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          Icon={ChevronLeft}
          size={ButtonSize.ICON_MD}
          disabled={selectedIndex === 0}
        />

        <Popover.Detail identifier="carousel-prev">
          <div className="flex items-center gap-2 p-2">
            <span className="whitespace-nowrap text-neutral text-xs">
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
          variant={ButtonVariant.HOVERABLE}
          color={ButtonColor.NEUTRAL}
          roundedSize="full"
          label={nextSlide.value}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          Icon={ChevronRight}
          size={ButtonSize.ICON_MD}
          disabled={selectedIndex === totalItems - 1}
        />

        <Popover.Detail identifier="carousel-next">
          <div className="flex items-center gap-2 p-2">
            <span className="whitespace-nowrap text-neutral text-xs">
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
    if (isValidElement(child) && child.type === CarouselItem) {
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

  // Drag State
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation Logic
  const handleSwitchItem = (diff: number) => {
    if (typeof window === 'undefined') return;

    const screenWidth = window.innerWidth;
    const swipeStep = screenWidth / SWIPE_THRESHOLD_DIVISOR;
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
    setStartX(e.touches[0].clientX);
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) handleSwitchItem(e.touches[0].clientX - startX);
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

  // Calculate height based on the MAX height of ALL items
  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = itemsRef.current.map((item) => item?.offsetHeight || 0);
      const maxHeight = Math.max(0, ...heights);

      if (maxHeight > 0) {
        setContainerHeight(maxHeight + 40);
      }
    };

    calculateMaxHeight();

    const observer = new ResizeObserver(() => {
      calculateMaxHeight();
    });

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [totalItems]); // Removed isMounted dependency

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
          'relative w-full cursor-grab select-none outline-none transition-[height] duration-300 ease-in-out focus:outline-none focus:outline-none focus:ring-0 active:cursor-grabbing',
          className
        )}
        style={{
          height: containerHeight > 0 ? containerHeight : 'auto',
          minHeight: '400px',
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
                // FIX 3: getCardPositionX now returns '30vw', so no 'px' suffix needed here
                transform: `
                  translateX(${getCardPositionX(index, displayedIndex)}) 
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
