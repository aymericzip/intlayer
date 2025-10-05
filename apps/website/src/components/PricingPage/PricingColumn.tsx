import { Link } from '@components/Link/Link';
import {
  Container,
  type ContainerProps,
  H2,
  Loader,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { Check } from 'lucide-react';
import type { FC, ReactNode } from 'react';

type PricingColumnProps = {
  title: ReactNode;
  totalPrice: number;
  basePrice: number;
  isPriceLoading: boolean;
  unit?: ReactNode;
  period: ReactNode;
  description: ReactNode;
  checkPoint: ReactNode[];
  callToActionUrl: string;
  callToActionLabel: string;
  callToActionText: string;
} & ContainerProps;

export const PricingColumn: FC<PricingColumnProps> = ({
  title,
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
  className,
  ...props
}) => (
  <Container
    roundedSize="xl"
    className={cn(
      'min-w-80 max-w-lg flex-1 flex-col gap-8 p-4 transition-all duration-300',
      className
    )}
    itemScope
    transparency="lg"
    itemType="http://schema.org/Offer"
    {...props}
  >
    <H2 className="mt-4 text-center" itemProp="name">
      {title}
    </H2>
    <div className="flex flex-col justify-center">
      <Loader isLoading={isPriceLoading}>
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
              <span className="absolute top-1/2 left-0 h-[2px] w-full bg-neutral" />

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
      href={callToActionUrl}
      variant="button"
      color="text"
      isExternalLink={false}
      className="text-center"
    >
      {callToActionText}
    </Link>
    <span
      className="justify-center text-neutral text-sm leading-7"
      itemProp="description"
    >
      {description}
    </span>
    <ul className="flex flex-col gap-4 p-4">
      {checkPoint.map((el, index) => (
        <li className="flex items-start gap-3" key={index}>
          <span className="block aspect-square rounded-full border-[2.5px] border-lime-300 p-0.5 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
            <Check className="size-4" />
          </span>
          <span className="text-neutral text-sm" itemProp="feature">
            {el}
          </span>
        </li>
      ))}
    </ul>
    <link itemProp="availability" href="http://schema.org/InStock" />
  </Container>
);
