import {
  Container,
  type ContainerProps,
} from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { Tag } from '@intlayer/design-system/tag';
import { cn } from '@intlayer/design-system/utils';
import { Check } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { Link } from '#components/Link/Link';

type PricingColumnProps = {
  title: ReactNode;
  badge?: ReactNode;
  totalPrice: number;
  basePrice: number;
  isPriceLoading: boolean;
  unit?: ReactNode;
  period: ReactNode;
  description: ReactNode;
  checkPoint: string[];
  previousCheckpoints?: string[];
  callToActionUrl: string;
  callToActionLabel: string;
  callToActionText: string;
  priceLabel?: ReactNode;
} & ContainerProps;

export const PricingColumn: FC<PricingColumnProps> = ({
  title,
  badge,
  totalPrice,
  basePrice,
  isPriceLoading,
  unit,
  period,
  description,
  callToActionUrl,
  callToActionLabel,
  callToActionText,
  checkPoint,
  previousCheckpoints,
  priceLabel,
  className,
  ...props
}) => (
  <Container
    roundedSize="3xl"
    className={cn(
      'min-w-80 max-w-lg flex-1 flex-col gap-8 p-4 transition-all duration-300',
      className
    )}
    itemScope
    transparency="md"
    itemType="http://schema.org/Offer"
    {...props}
  >
    <div className="mt-4 flex flex-col items-center gap-2">
      <H2 className="text-center" itemProp="name">
        {title}
      </H2>
      {badge && (
        <Tag size="sm" color="warning">
          {badge}
        </Tag>
      )}
    </div>
    <div className="flex min-h-18 flex-col justify-center">
      <Loader isLoading={isPriceLoading}>
        {priceLabel ? (
          <span className="relative m-auto text-center font-bold text-4xl">
            {priceLabel}
          </span>
        ) : (
          <span className="relative m-auto text-center font-bold text-6xl">
            <span itemProp="price" className="hidden">
              {totalPrice.toFixed(2)}
            </span>
            <span>{totalPrice.toFixed(2).split('.')[0]}</span>
            <span className="text-3xl">
              {`.${totalPrice.toFixed(2).split('.')[1]}`}
            </span>
            <span className="text-xl" itemProp="priceCurrency">
              {unit}
            </span>

            {totalPrice !== basePrice && (
              <span className="absolute top-0 left-full m-auto scale-90 text-center font-bold text-2xl text-neutral">
                <span className="absolute top-1/2 left-0 h-0.5 w-full bg-neutral" />

                <span itemProp="price" className="hidden">
                  {basePrice.toFixed(2)}
                </span>
                <span>{basePrice.toFixed(2).split('.')[0]}</span>
                <span className="text-xl">
                  {`.${basePrice.toFixed(2).split('.')[1]}`}
                </span>
                <span className="text-base" itemProp="priceCurrency">
                  $
                </span>
              </span>
            )}
          </span>
        )}
      </Loader>
      <span
        className="text-center text-neutral text-xl"
        itemProp="billingPeriod"
      >
        {period} {/* This can be 'monthly' or 'yearly' */}
      </span>
    </div>
    <Link
      label={callToActionLabel}
      to={callToActionUrl}
      variant="button"
      color="text"
      className="text-center"
    >
      {callToActionText}
    </Link>
    <span
      className="justify-center text-md text-text/50 leading-7"
      itemProp="description"
    >
      {description}
    </span>
    <ul className="flex flex-col gap-4 p-4">
      {checkPoint.map((el, index) => {
        const isNew =
          previousCheckpoints !== undefined &&
          !previousCheckpoints.includes(el);
        return (
          <li className="flex items-center gap-5" key={el || index}>
            <span className="block aspect-square rounded-full border-[2.5px] border-lime-300 p-0.5 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
              <Check className="size-2" />
            </span>
            <span
              className={cn('text-md', isNew ? 'text-text/50' : 'text-neutral')}
              itemProp="feature"
            >
              {el}
            </span>
          </li>
        );
      })}
    </ul>
    <link itemProp="availability" href="http://schema.org/InStock" />
  </Container>
);
