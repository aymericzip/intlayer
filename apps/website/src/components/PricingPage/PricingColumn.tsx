import { Link } from '@components/Link/Link';
import { H2, Container, type ContainerProps } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { Check } from 'lucide-react';
import { type ReactNode, type FC } from 'react';

type PricingColumnProps = {
  title: ReactNode;
  price: number;
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
  price,
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
      <span className="text-center text-6xl font-bold">
        <span itemProp="price" className="hidden">
          {price.toFixed(2)}
        </span>
        <span>{price.toFixed(2).split('.')[0]}</span>
        <span className="text-3xl">{'.' + price.toFixed(2).split('.')[1]}</span>
        <span className="text-xl" itemProp="priceCurrency">
          {unit}
        </span>
      </span>
      <span
        className="text-neutral text-center text-xl"
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
    >
      {callToActionText}
    </Link>
    <span
      className="text-neutral justify-center text-sm leading-7"
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
