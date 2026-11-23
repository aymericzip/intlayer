import type { FC, ReactNode } from 'react';
import { ProductSection } from './layout';
import { Reveal } from './motion';

type ProductFinalCTAProps = {
  id?: string;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  /** Optional companion shown beside the copy, such as a quick start. */
  aside?: ReactNode;
};

/** Closing call to action shared by the product landing pages. */
export const ProductFinalCTA: FC<ProductFinalCTAProps> = ({
  id,
  title,
  description,
  actions,
  aside,
}) => (
  <ProductSection id={id}>
    <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col items-start gap-4 lg:col-span-6">
        <h2 className="text-3xl leading-tight font-medium text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
        <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          {actions}
        </div>
      </div>
      {aside && <div className="min-w-0 lg:col-span-6">{aside}</div>}
    </Reveal>
  </ProductSection>
);
