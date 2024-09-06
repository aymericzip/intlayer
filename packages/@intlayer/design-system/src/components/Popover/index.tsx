import type { FC, ReactNode } from 'react';

type PopoverProps = {
  content: ReactNode | string;
  children: ReactNode;
};

export const Popover: FC<PopoverProps> = ({ children, content }) => (
  <div
    className="group relative"
    aria-haspopup={true}
    aria-expanded={false}
    aria-label="Display the popup by hovering this element"
  >
    {children}
    <div
      className="bg-card dark:bg-card-dark absolute bottom-0 left-5 z-50 translate-y-[150%] rounded-md p-1 text-xs text-opacity-75 opacity-0 ring-2 ring-current transition-all delay-200 duration-200 ease-in-out hover:delay-0 group-hover:opacity-100"
      aria-hidden={true}
    >
      {content}
    </div>
  </div>
);
