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
    className={cn('relative flex flex-col gap-4 md:pl-14', className)}
    {...props}
  >
    <span className="absolute -top-0.5 left-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-text/30 border-dotted bg-background font-black text-lg text-text/70 max-md:hidden">
      <span>{number}</span>
    </span>
    <div className="absolute top-7.5 left-[1.05rem] h-[calc(100%_+_0.5rem)] border-1 border-text/20 border-l border-dashed last-of-type:hidden max-md:hidden" />
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
    <div className="flex flex-col gap-8">{children}</div>
  </div>
);

type StepsProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const Steps: FC<StepsProps> = ({ children, className, ...props }) => (
  <div
    className={cn(
      'flex flex-col gap-8 [&>*:last-child>div.absolute]:hidden',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
