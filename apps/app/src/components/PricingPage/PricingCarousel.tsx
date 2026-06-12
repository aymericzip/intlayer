import type { GetPricingResult } from '@intlayer/backend';
import {
  useGetAffiliatePromoCode,
  useGetPricing,
  useUser,
} from '@intlayer/design-system/api';
import { cn } from '@intlayer/design-system/utils';
import { useNavigate, useSearch } from '@tanstack/react-router';
import React, {
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  type TouchEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { formatOnboardUrl } from '#components/OnboardPage/formatOnboardUrl';
import { Steps } from '#components/OnboardPage/steps';
import { type Period, Plans } from './data.content';
import { PricingColumn } from './PricingColumn';

type PricingCarouselProps = HTMLAttributes<HTMLDivElement> & {
  pricings: GetPricingResult['data'];
  focusedPeriod: Period;
  setFocusedPeriod: (period: Period) => void;
};

const subscriptionPlans: Plans[] = [
  Plans.Free,
  Plans.Premium,
  Plans.Enterprise,
];
const lifetimePlans: Plans[] = [Plans.Free, Plans.Lifetime, Plans.Custom];

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
  const allParams = useSearch({ strict: false }) as any;
  const navigate = useNavigate();

  const referralCode = allParams.ref
    ? String(allParams.ref).trim().toUpperCase()
    : undefined;
  const promoCode = allParams.promoCode
    ? String(allParams.promoCode).trim().toUpperCase()
    : undefined;

  const { data: affiliatePromo } = useGetAffiliatePromoCode(referralCode, {
    enabled: Boolean(referralCode && !promoCode),
  });

  useEffect(() => {
    if (affiliatePromo?.data && !promoCode) {
      navigate({
        search: ((prev: any) => ({
          ...prev,
          promoCode: affiliatePromo.data,
        })) as any,
      });
    }
  }, [affiliatePromo, promoCode, navigate]);

  const { pricing: pricingContent, priceFrequency } = useIntlayer(
    'pricing'
  ) as any;
  const pricing = pricingContent as any;
  const plans =
    focusedPeriod === 'lifetime' ? lifetimePlans : subscriptionPlans;
  const { data: pricingData, isFetching: isLoading } = useGetPricing(
    {
      priceIds: [
        import.meta.env.VITE_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
        import.meta.env.VITE_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
        import.meta.env.VITE_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
        import.meta.env.VITE_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
        import.meta.env.VITE_STRIPE_ONE_TIME_PAYMENT_PRICE_ID!,
      ],
      promoCode: allParams.promoCode,
    },
    {
      enabled: Boolean(allParams.promoCode),
    }
  );

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(
    null
  );
  const [displayedPlanIndex, setDisplayedPlanIndex] = useState<number>(
    selectedPlanIndex ?? 0
  );

  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [focusTimeout, setFocusTimeout] = useState<NodeJS.Timeout | null>(null);

  const columnsRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [carouselHeight, setCarouselHeight] = useState<number | string>(
    '100vh'
  );

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

  /**
   * Set a delay before selecting a plan to prevent immediate selection on hover
   * @param index - Index of the plan to be selected
   */
  const selectPlanAfterDelay = (index: number) => {
    if (!IS_SELECT_PLAN_ON_HOVER) return;

    if (focusTimeout) {
      clearTimeout(focusTimeout);
    }
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
    if (isClicked) return;
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
  }, [selectedPlanIndex, plans.length]);

  // Reset highlighted plan when the period switcher changes so the default
  // (middle column) is selected again — e.g. Lifetime when switching to lifetime.
  useEffect(() => {
    setSelectedPlanIndex(null);
    setIsClicked(false);
  }, [focusedPeriod]);

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
      }, 50);
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

  // Max height calculation effect
  useLayoutEffect(() => {
    const updateMaxHeight = () => {
      // Filter out null refs and map to their offsetHeights
      const heights = columnsRefs.current
        .filter((el): el is HTMLButtonElement => el !== null)
        .map((el) => el.offsetHeight);

      if (heights.length > 0) {
        // Set the carousel to the maximum height found + 60px offset
        const maxHeight = Math.max(...heights);
        setCarouselHeight(maxHeight + 60);
      }
    };

    // Calculate immediately, and wrap in setTimeout to ensure child DOM is fully painted
    setTimeout(updateMaxHeight, 0);

    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, [plans]); // Re-run only when the available plans change, not on column switch

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

  useEffect(() => {
    if (!selectedPlanIndex) {
      setDisplayedPlanIndex(1);
    }
  }, [selectedPlanIndex]);

  useEffect(() => {
    return () => {
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }
    };
  }, [focusTimeout]);

  const displayedPeriod = priceFrequency?.[focusedPeriod]?.value;

  return (
    <section
      // Removed the transition-[height] class to ensure strict, immediate sizing
      className="relative m-auto w-full max-w-5xl cursor-grab select-none active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Pricing Carousel"
      data-testid="pricing-carousel"
      style={{
        height:
          typeof carouselHeight === 'number'
            ? `${carouselHeight}px`
            : carouselHeight,
      }}
      {...props}
    >
      {plans.map((plan, index) => (
        <button
          type="button"
          className={cn(
            `absolute left-1/2 -translate-x-1/2 cursor-grab transition duration-300 ease-in-out focus:outline-none`,
            setColumnStyle(index, displayedPlanIndex)
          )}
          ref={(el) => {
            columnsRefs.current[index] = el;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedPlanIndex(index);
            }
            if (e.key === 'ArrowLeft') {
              setSelectedPlanIndex((prev) => Math.max(0, (prev ?? 0) - 1));
            }
            if (e.key === 'ArrowRight') {
              setSelectedPlanIndex((prev) =>
                Math.min(plans.length - 1, (prev ?? 0) + 1)
              );
            }
          }}
          aria-pressed={selectedPlanIndex === index}
          key={plan}
          style={
            columnsRefs.current[index]?.offsetWidth
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
            period={displayedPeriod}
            isPriceLoading={isLoading}
            totalPrice={getPrice(
              pricingData?.data?.[
                (pricing[focusedPeriod]?.[plan] as any)?.priceId?.value
              ]?.finalTotal ??
                pricings?.[
                  (pricing[focusedPeriod]?.[plan] as any)?.priceId?.value
                ]?.finalTotal ??
                0,
              focusedPeriod
            )}
            basePrice={getPrice(
              pricingData?.data?.[
                (pricing[focusedPeriod]?.[plan] as any)?.priceId?.value
              ]?.originalTotal ??
                pricings?.[
                  (pricing[focusedPeriod]?.[plan] as any)?.priceId?.value
                ]?.originalTotal ??
                0,
              focusedPeriod
            )}
            checkPoint={
              pricing[focusedPeriod]?.[plan]?.checkPoint?.map(
                (el: any) => el.value
              ) ?? []
            }
            callToActionLabel={
              pricing[focusedPeriod]?.[plan]?.callToAction?.label?.value
            }
            callToActionText={
              pricing[focusedPeriod]?.[plan]?.callToAction?.text?.value
            }
            callToActionUrl={
              plan === Plans.Custom
                ? 'https://calendly.com/ay-pineau/new-meeting'
                : formatOnboardUrl({
                    plan,
                    period: focusedPeriod,
                    step: user ? Steps.SetupOrganization : Steps.Registration,
                    otherParams: allParams,
                  })
            }
            title={pricing[focusedPeriod]?.[plan]?.title?.value}
            badge={pricing[focusedPeriod]?.[plan]?.badge?.value}
            previousCheckpoints={
              index > 0
                ? (pricing[focusedPeriod]?.[plans[index - 1]]?.checkPoint?.map(
                    (el: any) => el.value
                  ) ?? [])
                : undefined
            }
            priceLabel={
              (pricing[focusedPeriod]?.[plan] as any)?.priceLabel?.value
            }
            description={pricing[focusedPeriod]?.[plan]?.description?.value}
            className={displayedPlanIndex !== index ? 'hover:scale-103' : ''}
          />
        </button>
      ))}
    </section>
  );
};
