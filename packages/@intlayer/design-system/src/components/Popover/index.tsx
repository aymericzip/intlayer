import type { FC, ReactNode } from 'react';
import tw from 'twin.macro';

type PopoverProps = {
  content: ReactNode | string;
  children: ReactNode;
};

const StyledTrigger = tw.div`relative`;
const StyledContent = tw.div`opacity-0 group-hover:opacity-100 absolute right-5 bottom-0 translate-y-7 text-opacity-75 text-xs bg-current rounded-md p-1 transition-all duration-200 delay-700 ease-in hover:delay-0 ease-in-out`;
const StyledString = tw.span`mix-blend-difference select-none text-white max-w-[60%]`;

export const Popover: FC<PopoverProps> = ({ children, content }) => (
  <StyledTrigger
    className="group"
    aria-haspopup={true}
    aria-expanded={false}
    aria-label="Display the popup by hovering this element"
  >
    {children}
    <StyledContent aria-hidden={true}>
      {typeof content === 'string' ? (
        <StyledString>{content}</StyledString>
      ) : (
        content
      )}
    </StyledContent>
  </StyledTrigger>
);
