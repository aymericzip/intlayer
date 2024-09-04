import type { DetailedHTMLProps, FC } from 'react';
import tw from 'twin.macro';

type CopiedTextInformationProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const StyledI = tw.i`text-xs text-neutral-400`;

export const InformationTag: FC<CopiedTextInformationProps> = ({
  className,
  children,
  ...props
}) => <StyledI {...props}>ⓘ {children}</StyledI>;
