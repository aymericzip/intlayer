import { cn } from '@intlayer/design-system/utils';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Reveal } from './motion';

type ProductSectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

/** Page section with the shared width, gutters and vertical rhythm. */
export const ProductSection: FC<ProductSectionProps> = ({
  id,
  className,
  children,
}) => (
  <section
    id={id}
    className={cn(
      'mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 md:px-8 md:py-24',
      className
    )}
  >
    {children}
  </section>
);

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

/** Start-aligned section title with an optional lead paragraph. */
export const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  description,
  className,
}) => (
  <Reveal className={cn('mb-12 flex max-w-2xl flex-col gap-4', className)}>
    <h2 className="text-3xl leading-tight font-medium text-foreground md:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    )}
  </Reveal>
);

type LocaleKeyProps = {
  locale: string;
  /** Marks the locale the visual is about, in the accent color. */
  isActive?: boolean;
};

/**
 * Locale code drawn as a small keycap: the signature detail of the product
 * landing pages, used only where a visual shows content in a given locale.
 */
export const LocaleKey: FC<LocaleKeyProps> = ({ locale, isActive = false }) => (
  <kbd
    className={cn(
      'inline-flex h-5 min-w-6 items-center justify-center rounded border px-1.5 font-mono text-xs leading-none',
      isActive
        ? 'border-lime-700/30 text-lime-800 dark:border-lime-300/30 dark:text-lime-300'
        : 'border-text/10 text-muted-foreground'
    )}
  >
    {locale}
  </kbd>
);

type WindowFrameProps = PropsWithChildren<{
  title: ReactNode;
  /** Right side of the title bar, for locale keys or a short label. */
  aside?: ReactNode;
  className?: string;
}>;

const WINDOW_DOTS = ['close', 'minimize', 'maximize'] as const;

/** Neutral application window used around product previews. */
export const WindowFrame: FC<WindowFrameProps> = ({
  title,
  aside,
  className,
  children,
}) => (
  <div
    className={cn(
      'overflow-hidden rounded-2xl border border-text/10 bg-card shadow-sm',
      className
    )}
  >
    <div className="flex h-10 items-center gap-4 border-b border-text/10 px-4">
      <span aria-hidden className="flex shrink-0 gap-1.5">
        {WINDOW_DOTS.map((dot) => (
          <span key={dot} className="size-2.5 rounded-full bg-text/15" />
        ))}
      </span>
      <span className="truncate font-mono text-xs text-muted-foreground">
        {title}
      </span>
      {aside && (
        <span className="ms-auto flex shrink-0 items-center gap-1">
          {aside}
        </span>
      )}
    </div>
    {children}
  </div>
);

export type FeatureListItem = {
  key: string;
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** Quiet status text after the title, like a release state. */
  badge?: ReactNode;
};

type FeatureListProps = {
  items: FeatureListItem[];
  className?: string;
};

/** Icon, title and description rows laid out on a grid, without cards. */
export const FeatureList: FC<FeatureListProps> = ({ items, className }) => (
  <ul className={cn('grid gap-x-12 gap-y-10 sm:grid-cols-2', className)}>
    {items.map(({ key, icon, title, description, badge }) => (
      <li key={key} className="flex gap-4">
        {icon && (
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-[18px] [&_svg]:stroke-[1.5]">
            {icon}
          </span>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="flex flex-wrap items-baseline gap-x-2 text-base font-medium text-foreground">
            {title}
            {badge && (
              <span className="font-mono text-xs font-normal text-muted-foreground">
                {badge}
              </span>
            )}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </li>
    ))}
  </ul>
);
