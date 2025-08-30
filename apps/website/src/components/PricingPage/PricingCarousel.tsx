'use client';

import { formatOnboardUrl } from '@components/OnboardPage/formatOnboardUrl';
import { Steps } from '@components/OnboardPage/steps';
import { GetPricingResult } from '@intlayer/backend';
import { useGetPricing, useUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useSearchParams } from 'next/navigation';
import React, {
  useEffect,
  useRef,
  useState,
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  type TouchEventHandler,
} from 'react';
import { Plans, type Period } from './data.content';
import { PricingColumn } from './PricingColumn';

type PricingCarouselProps = HTMLAttributes<HTMLDivElement> & {
  pricings: GetPricingResult['data'];
  focusedPeriod: Period;
  setFocusedPeriod: (period: Period) => void;
};

const plans: Plans[] = [Plans.Free, Plans.Premium, Plans.Enterprise];

const IS_SELECT_PLAN_ON_HOVER = false;
const SELECT_PLAN_ON_HOVER_TIMEOUT = 1000;

const getPrice = (price: number, period: Period): number => {
  if (period === 'yearly') {
    return price / 12 / 100;
  }

  return price / 100;
};

/**
 * PricingCarousel component
 * @param props - React props
 * @param focusedPeriod - Currently selected pricing period (e.g. 'monthly', 'yearly')
 * @param setFocusedPeriod - Function to update the focused pricing period
 * @returns - PricingCarousel component for the pricing plans
 */
export const PricingCarousel: FC<PricingCarouselProps> = ({
  focusedPeriod,
  setFocusedPeriod,
  pricings,
  ...props
}) => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const allParams = Object.fromEntries(searchParams.entries());

  const { pricing, period } = useIntlayer('pricing');
  const { data: pricingData, isFetching: isLoading } = useGetPricing(
    {
      priceIds: [
        process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
        process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
        process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
        process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
      ],
      promoCode: allParams.promoCode,
    },
    {
      enabled: Boolean(allParams.promoCode),
    }
  );
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(
    null
  ); // Index of selected plan, starting as null
  const [displayedPlanIndex, setDisplayedPlanIndex] = useState<number>(
    selectedPlanIndex ?? 0
  ); // Index of the plan currently displayed

  const [startX, setStartX] = useState(0); // Stores the start position of a swipe or drag event
  const [isDragging, setIsDragging] = useState(false); // Indicates if a dragging action is happening
  const [isClicked, setIsClicked] = useState(false); // Tracks if a plan has been clicked to prevent selection on hover
  const [focusTimeout, setFocusTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout for delayed plan selection on hover

  const columnRef = useRef<HTMLDivElement>(null); // Reference to the pricing column div element

  /**
   * Handle switching plans based on swipe or drag distance
   * @param diff - Difference in X coordinate from swipe/drag start
   */
  const handleSwitchPlan = (diff: number) => {
    const screenWidth = window.innerWidth;
    const swipeStep = screenWidth / 5; // Defines how much distance must be swiped to switch plans
    const numSwipe = Math.round(diff / swipeStep);

    if (Math.abs(numSwipe) >= 1) {
      const newIndex = (displayedPlanIndex ?? displayedPlanIndex) - numSwipe;

      // Update the selected plan index if within valid range
      if (newIndex >= 0 && newIndex < plans.length) {
        setSelectedPlanIndex(newIndex);
        setStartX((prev) => prev + diff);
      }
    }
  };

  /** Mouse event handlers for drag functionality */
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartX(e.clientX); // Store the initial X position on mouse down
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      const diff = e.clientX - startX; // Calculate the difference from the start position
      handleSwitchPlan(diff);
    }
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    setIsDragging(false); // Stop dragging
  };

  /** Touch event handlers for swipe functionality */
  const handleTouchStart: TouchEventHandler = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX ?? 0); // Store the initial X position on touch start
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    if (isDragging) {
      const diff = e.touches[0].clientX - startX; // Calculate the difference from the start position
      handleSwitchPlan(diff);
    }
  };

  const handleTouchEnd: TouchEventHandler = () => {
    setIsDragging(false); // Stop dragging
  };

  /**
   * Set a delay before selecting a plan to prevent immediate selection on hover
   * @param index - Index of the plan to be selected
   */
  const selectPlanAfterDelay = (index: number) => {
    if (!IS_SELECT_PLAN_ON_HOVER) return;

    // Clear existing timeout if it exists
    if (focusTimeout) {
      clearTimeout(focusTimeout);
    }
    // Set new timeout to select plan after 0.5 seconds
    const newTimeout = setTimeout(() => {
      setSelectedPlanIndex(index);
    }, SELECT_PLAN_ON_HOVER_TIMEOUT);
    setFocusTimeout(newTimeout);
  };

  /**
   * Handle mouse enter event to set delayed plan selection
   * @param index - Index of the plan to be selected
   * @returns Mouse event handler function
   */
  const handleMouseEnter = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClicked) return; // Prevent hover selection if plan is clicked
    selectPlanAfterDelay(index);
  };

  /**
   * Ensure selected plan index stays within bounds of available plans
   */
  useEffect(() => {
    if (selectedPlanIndex === null) return;

    if (selectedPlanIndex < 0) {
      setSelectedPlanIndex(0);
    } else if (selectedPlanIndex > plans.length - 1) {
      setSelectedPlanIndex(plans.length - 1);
    }
  }, [selectedPlanIndex]);

  /**
   * Smoothly transition between plans if the selected plan index changes
   */
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
      }, 50); // Smoothly adjust index in steps
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedPlanIndex, displayedPlanIndex]);

  /**
   * Set column styling based on its position relative to the displayed plan
   * @param index - Index of the plan column
   * @param displayedIndex - Index of the displayed plan column
   * @returns - Tailwind CSS class for styling the column
   */
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

  /**
   * Set column scale based on its position relative to the displayed plan
   * @param index - Index of the plan column
   * @param displayedIndex - Index of the displayed plan column
   * @returns - Scale value for the column
   */
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

  /**
   * Set column X position based on its index relative to the displayed plan
   * @param index - Index of the plan column
   * @param displayedIndex - Index of the displayed plan column
   * @returns - Calculated X position for the column
   */
  const setColumnPositionX = (index: number, displayedIndex: number) => {
    const diff = index - displayedIndex;
    const screenWidth = window.innerWidth;
    const offset = (3 * screenWidth) / 10;

    return diff * offset;
  };

  // Set initial displayed plan index if none is selected
  useEffect(() => {
    if (!selectedPlanIndex) {
      setDisplayedPlanIndex(1);
    }
  }, [selectedPlanIndex]);

  // Clear the focus timeout on component unmount
  useEffect(() => {
    return () => {
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }
    };
  }, [focusTimeout]);

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
              translateX(${setColumnPositionX(index, displayedPlanIndex)}px)
              scale(${setColumnScale(index, displayedPlanIndex)})
            `,
                }
              : undefined
          }
          onClick={(e) => {
            e.stopPropagation();

            setIsClicked(true);
            setSelectedPlanIndex(index);
          }}
          onMouseEnter={handleMouseEnter(index)}
        >
          <PricingColumn
            unit="$"
            period={period['monthly'].value}
            isPriceLoading={isLoading}
            totalPrice={getPrice(
              pricingData?.data?.[
                (pricing[focusedPeriod][plan] as any).priceId?.value
              ]?.finalTotal ??
                pricings?.[(pricing[focusedPeriod][plan] as any).priceId?.value]
                  ?.finalTotal ??
                0,
              focusedPeriod
            )}
            basePrice={getPrice(
              pricingData?.data?.[
                (pricing[focusedPeriod][plan] as any).priceId?.value
              ]?.originalTotal ??
                pricings?.[(pricing[focusedPeriod][plan] as any).priceId?.value]
                  ?.originalTotal ??
                0,
              focusedPeriod
            )}
            checkPoint={pricing[focusedPeriod][plan].checkPoint.map(
              (el) => el.value
            )}
            callToActionLabel={
              pricing[focusedPeriod][plan].callToAction.label.value
            }
            callToActionText={
              pricing[focusedPeriod][plan].callToAction.text.value
            }
            callToActionUrl={formatOnboardUrl({
              plan,
              period: focusedPeriod,
              step: user ? Steps.SetupOrganization : Steps.Registration,
              otherParams: allParams,
            })}
            title={pricing[focusedPeriod][plan].title.value}
            description={pricing[focusedPeriod][plan].description.value}
            className={displayedPlanIndex !== index ? 'hover:scale-103' : ''}
          />
        </div>
      ))}
    </div>
  );
};
