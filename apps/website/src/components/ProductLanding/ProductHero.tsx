import type { FC, ReactNode } from 'react';

export type HeroMetaItem = {
  key: string;
  icon: ReactNode;
  label: ReactNode;
};

type ProductHeroProps = {
  /** Product name above the headline, as quiet mono text. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** One primary and at most one secondary action. */
  actions: ReactNode;
  /** Short facts listed under the actions. */
  meta?: HeroMetaItem[];
  /** The product preview, given the wider column. */
  visual: ReactNode;
};

/**
 * Split hero shared by the product landing pages: copy in the narrow column,
 * the product preview in the wide one, stacked in reading order on mobile.
 */
export const ProductHero: FC<ProductHeroProps> = ({
  eyebrow,
  title,
  description,
  actions,
  meta,
  visual,
}) => (
  <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-12 pb-20 md:px-8 lg:min-h-[calc(100dvh-60px)] lg:grid-cols-12 lg:gap-16 lg:py-16">
    <div className="product-hero-enter flex flex-col items-start gap-6 lg:col-span-5">
      {eyebrow && (
        <span className="font-mono text-sm text-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl leading-[1.08] font-medium text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {actions}
      </div>
      {meta && (
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {meta.map(({ key, icon, label }) => (
            <li key={key} className="flex items-center gap-2">
              <span className="flex text-muted-foreground [&_svg]:size-4 [&_svg]:stroke-[1.5]">
                {icon}
              </span>
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="product-hero-enter min-w-0 [animation-delay:80ms] lg:col-span-7">
      {visual}
    </div>
  </section>
);
