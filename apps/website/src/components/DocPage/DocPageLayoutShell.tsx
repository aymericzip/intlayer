import type { FC, ReactNode } from 'react';
import { AsideNavigation } from './AsideNavigation/AsideNavigation';
import { TOCProgressBar } from './TOCProgressBar/TOCProgressBar';

export type DocPageLayoutShellProps = {
  nav: ReactNode;
  navAriaLabel?: string;
  breadcrumb?: ReactNode;
  children?: ReactNode;
  innerTrailingContent?: ReactNode;
  trailingContent?: ReactNode;
  contentAriaLabel?: string;
  asideAriaLabel?: string;
  displayAsideNavigation?: boolean;
};

export const DocPageLayoutShell: FC<DocPageLayoutShellProps> = ({
  nav,
  navAriaLabel,
  breadcrumb,
  children,
  innerTrailingContent,
  trailingContent,
  contentAriaLabel,
  asideAriaLabel,
  displayAsideNavigation = true,
}) => (
  <div className="flex w-full bg-card max-md:flex-col md:h-[calc(100dvh-3.5rem)] lg:pl-2">
    <aside aria-label={navAriaLabel} className="z-40 flex-none">
      {nav}
    </aside>
    <div className="mx-1 mb-3 flex min-h-0 min-w-0 flex-1 flex-row rounded-2xl border border-neutral/40 bg-background lg:my-3 lg:mr-2 lg:ml-0">
      <article
        aria-label={contentAriaLabel}
        className="no-scrollbar relative mb-3 h-full max-h-[calc(100vh-4.5rem)] w-auto flex-1 grow scroll-pt-6 overflow-y-auto scroll-smooth px-4 pb-24 max-md:pl-10 md:px-10"
        id="content"
      >
        <div className="m-auto max-w-3xl">
          {breadcrumb}
          {children}
          {innerTrailingContent}
        </div>

        {trailingContent}
      </article>

      {displayAsideNavigation && (
        <aside
          aria-label={asideAriaLabel}
          className="flex flex-none flex-row max-lg:hidden"
        >
          <TOCProgressBar />
          <AsideNavigation />
        </aside>
      )}
    </div>
  </div>
);
