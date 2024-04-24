import type { FC, HTMLAttributes, ReactNode } from 'react';

interface MaxHeightSmootherProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MaxHeightSmoother: FC<MaxHeightSmootherProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className="relative grid w-full grid-rows-[0fr] overflow-hidden transition-all duration-700 ease-in-out hover:grid-rows-[1fr] hover:overflow-x-auto"
    {...props}
  >
    <div className="max-h-80 min-h-10 overflow-y-scroll">{children}</div>
  </div>
);
