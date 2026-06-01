import { cn } from '@utils/cn';
import type { FC, HTMLAttributes, ReactNode } from 'react';

type StepProps = HTMLAttributes<HTMLDivElement> & {
  number: number;
  title?: string;
  isOptional?: boolean;
  children: ReactNode;
};

export const Step: FC<StepProps> = ({
  number,
  title,
  isOptional = false,
  children,
  className,
  ...props
}) => (
  <div
    className={cn('relative flex w-full flex-1 gap-4', className)}
    {...props}
  >
    <div className="flex flex-col max-md:hidden">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-text/30 border-dotted bg-background font-black text-base text-text/70 max-md:hidden">
        {number}
      </span>
      <div className="ml-4 flex-1 border-text/20 border-l border-dashed" />
    </div>

    <div className="mb-8 flex w-full min-w-0 flex-col gap-8">
      {title && (
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg text-text">{title}</h3>
          {isOptional && (
            <span className="ml-4 rounded-full bg-neutral/15 px-3 py-1 text-text/90 text-xs">
              Optional
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  </div>
);

type StepsProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const Steps: FC<StepsProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);
