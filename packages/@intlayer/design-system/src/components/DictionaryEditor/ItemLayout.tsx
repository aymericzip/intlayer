import type { ReactNode, FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Accordion } from '../Accordion';

interface ItemWrapperProps extends HTMLAttributes<HTMLDivElement> {
  level: number;
  children: ReactNode;
  title: string;
  description: string;
  rightParam?: ReactNode;
  isSelected: boolean;
}

export const ItemLayout: FC<ItemWrapperProps> = ({
  level,
  title,
  description,
  children,
  rightParam,
  isSelected,
  ...props
}) => (
  <div
    className={cn(
      'rounded-md p-2 transition',
      'hover:bg-card/30 dark:hover:bg-card-dark/30 [&:has(.section:hover)]:bg-transparent',
      level === 2 && 'hover:bg-card/30 dark:hover:bg-card-dark/30',
      level >= 3 && '',
      isSelected === true && 'bg-card/40 dark:bg-card-dark/40'
    )}
    {...props}
  >
    <Accordion
      isOpen={isSelected}
      label={title}
      identifier={`accordion_${title}`}
      header={
        <div className="flex w-full">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                level === 0 && 'text-2xl',
                level === 1 && 'text-xl',
                level === 2 && 'text-lg',
                level >= 3 && 'text-base'
              )}
            >
              {title}
            </span>
            {rightParam && (
              <div className="flex w-auto items-center justify-between p-3">
                {rightParam}
              </div>
            )}
          </div>
          {description && (
            <p className="text-card pl-3 text-sm">{description}</p>
          )}
        </div>
      }
    >
      {children}
    </Accordion>
  </div>
);
