import { cn } from '@utils/cn';
import type { FC, HTMLAttributes, OlHTMLAttributes, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { H3 } from '../Headers';

const slugify = (text: string) =>
  String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

type StepProps = HTMLAttributes<HTMLLIElement> & {
  number: number | string;
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
}) => {
  const { stepLabel, optionalLabel } = useIntlayer('steps');

  return (
    <li
      className={cn('group relative flex w-full flex-1 gap-4', className)}
      {...props}
    >
      <div className="flex flex-col max-md:hidden" aria-hidden="true">
        <div className="ml-4 h-10 border-text/20 border-l border-dashed group-first-of-type:hidden" />
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-text/30 border-dotted bg-background font-black text-base text-text/70 max-md:hidden',
            'group-first-of-type:mt-10'
          )}
        >
          {number}
        </span>
        <div
          className={cn(
            'ml-4 flex-1 border-text/20 border-l border-dashed',
            'group-last-of-type:h-40 group-last-of-type:flex-none group-last-of-type:[-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] group-last-of-type:[mask-image:linear-gradient(to_bottom,black,transparent)]'
          )}
        />
      </div>

      <div className="mt-10 mb-8 flex w-full min-w-0 flex-col gap-8">
        {title && (
          <div className="flex items-center items-center gap-2">
            <H3
              isClickable
              id={`step-${number}-${slugify(title)}`}
              aria-label={`${stepLabel} ${number}: ${title}`}
              className="font-semibold text-lg text-text"
            >
              {title}
            </H3>
            {isOptional && (
              <span className="mb-2 ml-4 rounded-full bg-neutral/15 px-3 py-1 text-text/90 text-xs">
                {optionalLabel}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </li>
  );
};

type StepsProps = OlHTMLAttributes<HTMLOListElement> & {
  children: ReactNode;
};

export const Steps: FC<StepsProps> = ({ children, className, ...props }) => (
  <ol className={cn('list-none', className)} {...props}>
    {children}
  </ol>
);
