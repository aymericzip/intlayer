import { cn } from '@utils/cn';
import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export type PageContentLayoutProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  footer?: ReactNode;
  navbar?: ReactNode;
  mobileRollable?: boolean;
};

export const PageContentLayout: FC<PageContentLayoutProps> = ({
  navbar,
  children,
  footer,
  className,
  mobileRollable,
  ...props
}) => (
  <>
    {navbar ?? <Navbar mobileRollable={mobileRollable} />}
    <main
      className={cn('relative flex w-full flex-1 flex-col', className)}
      {...props}
    >
      {children}
    </main>

    <div className="flex w-full flex-0 flex-col">{footer ?? <Footer />}</div>
  </>
);
