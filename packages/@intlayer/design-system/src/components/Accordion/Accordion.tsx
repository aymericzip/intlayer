'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

type AccordionProps = {
  identifier: string;
  header: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
};

const StyledHeader = tw.div`flex justify-between items-center cursor-pointer`;
const StyledChevronDown = styled(ChevronDown)<{
  $isOpen: boolean;
}>`
  ${({ $isOpen }) =>
    $isOpen ? tw`transform rotate-0` : tw`transform rotate-180`}
`;

export const Accordion: FC<AccordionProps> = ({
  children,
  header,
  isOpen: isOpenDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const isHidden = isOpen === undefined ? undefined : !isOpen;

  useEffect(() => {
    if (isOpenDefault !== undefined) {
      setIsOpen(isOpenDefault);
    }
  }, [isOpenDefault]);

  return (
    <>
      <StyledHeader onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
        {header}
        <StyledChevronDown size={24} $isOpen={isOpen} />
      </StyledHeader>

      <MaxHeightSmoother isHidden={isHidden}>{children}</MaxHeightSmoother>
    </>
  );
};
