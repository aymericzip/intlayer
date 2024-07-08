import type { FC, ReactNode } from 'react';
import tw from 'twin.macro';

type PopoverProps = {
  content: ReactNode | string;
  children: ReactNode;
};

const StyledTrigger = tw.div`relative`;
const StyledContent = tw.div`z-50 opacity-0 group-hover:opacity-100 absolute left-5 bottom-0 translate-y-[150%] text-opacity-75 text-xs rounded-md p-1 transition-all duration-200 delay-200 ease-in hover:delay-0 ease-in-out ring-current ring-2 bg-card dark:bg-card-dark`;

export const Popover: FC<PopoverProps> = ({ children, content }) => (
  <StyledTrigger
    className="group"
    aria-haspopup={true}
    aria-expanded={false}
    aria-label="Display the popup by hovering this element"
  >
    {children}
    <StyledContent aria-hidden={true}>{content}</StyledContent>
  </StyledTrigger>
);
