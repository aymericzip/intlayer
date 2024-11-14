import { H2, Container, type ContainerProps } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { Check } from 'lucide-react';
import { forwardRef, type ReactNode } from 'react';

type PricingColumnProps = {
  title: ReactNode;
  price: number;
  unit?: ReactNode;
  period: ReactNode;
  description: ReactNode;
  callToAction: ReactNode;
  checkPoint: ReactNode[];
} & ContainerProps;

export const PricingColumn = forwardRef<HTMLDivElement, PricingColumnProps>(
  (
    {
      title,
      price,
      unit,
      period,
      description,
      callToAction,
      checkPoint,
      className,
      ...props
    },
    ref
  ) => (
    <Container
      roundedSize="xl"
      className={cn(
        'min-w-80 max-w-lg flex-1 flex-col gap-8 p-4 transition-all duration-300',
        className
      )}
      ref={ref}
      {...props}
    >
      <H2 className="mt-4 text-center">{title}</H2>
      <div className="flex flex-col justify-center">
        <span className="text-center text-6xl font-bold">
          {price.toFixed(2).split('.')[0]}
          <span className="text-4xl">.{price.toFixed(2).split('.')[1]}</span>
          <span className="text-2xl">{unit}</span>
        </span>
        <span className="text-neutral dark:text-neutral-dark text-center text-xl">
          {period}
        </span>
      </div>
      {callToAction}
      <span className="text-neutral dark:text-neutral-dark justify-center text-sm">
        {description}
      </span>
      <div className="flex flex-col gap-4 p-4">
        {checkPoint.map((el) => (
          <div className="flex items-start gap-3" key={JSON.stringify(el)}>
            <span className="block aspect-square rounded-full border-[2.5px] border-lime-300 p-0.5 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
              <Check className="size-4" />
            </span>
            <span className="text-neutral dark:text-neutral-dark text-sm">
              {el}
            </span>
          </div>
        ))}
      </div>
    </Container>
  )
);

PricingColumn.displayName = 'PricingColumn';
