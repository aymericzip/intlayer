import { Link } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import React, {
  type MouseEventHandler,
  type TouchEventHandler,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type Period, type Plans } from './data.content';
import { PricingColumn } from './PricingColumn';

type PricingCarouselProps = HTMLAttributes<HTMLDivElement> & {
  focusedPeriod: Period;
  setFocusedPeriod: (period: Period) => void;
};

const plans: Plans[] = ['free', 'basic', 'premium'];

export const PricingCarousel = ({
  focusedPeriod,
  setFocusedPeriod,
  ...props
}: PricingCarouselProps) => {
  const { pricing, period, callToAction } = useIntlayer('pricing');
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(
    null
  ); // Index of 'basic' plan
  const [displayedPlanIndex, setDisplayedPlanIndex] = useState<number>(
    selectedPlanIndex ?? 0
  );

  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const columnRef = useRef<HTMLDivElement>(null);

  // Handle switching plans on swipe/drag
  const handleSwitchPlan = (diff: number) => {
    const screenWidth = window.innerWidth;
    const swipeStep = screenWidth / 5;
    const numSwipe = Math.round(diff / swipeStep);

    if (Math.abs(numSwipe) >= 1) {
      const newIndex = (displayedPlanIndex ?? displayedPlanIndex) - numSwipe;

      if (newIndex >= 0 && newIndex < plans.length) {
        setSelectedPlanIndex(newIndex);
        setStartX((prev) => prev + diff);
      }
    }
  };

  // Mouse event handlers
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      const diff = e.clientX - startX;
      handleSwitchPlan(diff);
    }
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart: TouchEventHandler = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX ?? 0);
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    if (isDragging) {
      const diff = e.touches[0].clientX - startX;
      handleSwitchPlan(diff);
    }
  };

  const handleTouchEnd: TouchEventHandler = () => {
    setIsDragging(false);
  };

  // Ensure selected plan index stays within bounds
  useEffect(() => {
    if (selectedPlanIndex === null) return;

    if (selectedPlanIndex < 0) {
      setSelectedPlanIndex(0);
    } else if (selectedPlanIndex > plans.length - 1) {
      setSelectedPlanIndex(plans.length - 1);
    }
  }, [selectedPlanIndex]);

  // Smooth transition between plans
  useEffect(() => {
    if (selectedPlanIndex === null) return;

    let interval: NodeJS.Timeout;
    if (selectedPlanIndex !== displayedPlanIndex) {
      interval = setInterval(() => {
        setDisplayedPlanIndex((prev) => {
          if (prev === selectedPlanIndex) {
            clearInterval(interval);
            return prev;
          }
          return prev < selectedPlanIndex ? prev + 1 : prev - 1;
        });
      }, 50);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedPlanIndex, displayedPlanIndex]);

  // Styling functions
  const setColumnStyle = (index: number, displayedIndex: number) => {
    const diff = Math.abs(index - displayedIndex);
    switch (diff) {
      case 0:
        return 'opacity-100 z-40';
      case 1:
        return 'opacity-75 z-30';
      case 2:
        return 'opacity-50 z-20';
      default:
        return 'opacity-0 z-10';
    }
  };

  const setColumnScale = (index: number, displayedIndex: number) => {
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

  const setColumnPositionX = (
    index: number,
    displayedIndex: number,
    columnWidth: number
  ) => {
    const diff = index - displayedIndex;
    const screenWidth = window.innerWidth;
    const offset = (3 * screenWidth) / 10;
    return -columnWidth / 2 + diff * offset;
  };

  useEffect(() => {
    if (!selectedPlanIndex) {
      setDisplayedPlanIndex(1);
    }
  }, [selectedPlanIndex]);

  return (
    <div
      className="relative h-screen w-full cursor-grab select-none overflow-hidden active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      data-testid="pricing-carousel"
      style={{
        height: (columnRef?.current?.offsetHeight ?? 0) + 30,
      }}
      {...props}
    >
      {plans.map((plan, index) => (
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition duration-300 ease-in-out${setColumnStyle(
            index,
            displayedPlanIndex
          )}`}
          ref={columnRef}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedPlanIndex(index); // Handle Enter/Space to activate
            }
            if (e.key === 'ArrowLeft') {
              setSelectedPlanIndex(
                (prev) => Math.max(0, (prev ?? 0) - 1) // Handle Left Arrow to go back
              );
            }
            if (e.key === 'ArrowRight') {
              setSelectedPlanIndex(
                (prev) => Math.min(plans.length - 1, (prev ?? 0) + 1) // Handle Right Arrow to go forward
              );
            }
          }}
          aria-pressed={selectedPlanIndex === index} // Indicates selected state
          key={plan}
          style={
            columnRef?.current?.offsetWidth
              ? {
                  transform: `
              translateX(${setColumnPositionX(
                index,
                displayedPlanIndex,
                columnRef.current.offsetWidth
              )}px)
              scale(${setColumnScale(index, displayedPlanIndex)})
            `,
                }
              : undefined
          }
          onClick={() => setSelectedPlanIndex(index)}
        >
          <PricingColumn
            unit="$"
            period={period['monthly'].value}
            callToAction={
              <Link
                label={callToAction.label.value}
                href="#"
                variant="button"
                color="text"
                isExternalLink={false}
              >
                {callToAction.text}
              </Link>
            }
            price={pricing[focusedPeriod][plan].price.value}
            checkPoint={pricing[focusedPeriod][plan].checkPoint.map(
              (el) => el.value
            )}
            title={pricing[focusedPeriod][plan].title.value}
            description={pricing[focusedPeriod][plan].description.value}
          />
        </div>
      ))}
    </div>
  );
};
