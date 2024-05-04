'use client';

import { X } from 'lucide-react';
import { type ReactNode, type FC, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { useScrollBlockage } from '../../hooks/useScrollBlockage';
import { capitalize } from '../../utils/capitalize';
import { MaxWidthSmoother } from '../MaxWidthSmoother/index';
import { useRightDrawerStore } from './useRightDrawerStore';

const StyledPositioner = tw.div`absolute right-0 top-0 h-full z-50`;
const StyledPanelContainer = tw.div`h-screen flex flex-col bg-white/80 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur text-black relative w-[400px]`;
const StyledHeader = tw.div`flex flex-col p-6 gap-3`;
const StyledNavBar = tw.div`flex justify-between items-center`;
const StyledScrollableContainer = tw.div`overflow-y-auto h-full p-2`;

const StyledCloseButton = styled(X)`
  ${tw`cursor-pointer`}
`;

type RightDrawerProps = {
  title?: ReactNode;
  label?: string;
  children?: ReactNode;
  header?: ReactNode;
  closeOnOutsideClick?: boolean;
};

export const RightDrawer: FC<RightDrawerProps> = ({
  title,
  label,
  children,
  header,
  closeOnOutsideClick = true,
}) => {
  const { isOpen, close } = useRightDrawerStore((s) => ({
    isOpen: s.isOpen,
    close: s.close,
  }));
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollBlockage({
    disableScroll: isOpen,
    key: label ? 'right_drawer' : `right_drawer_${label}`,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        closeOnOutsideClick &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close, closeOnOutsideClick]); // Make sure the effect runs only if isOpen or close changes

  return (
    <StyledPositioner>
      <MaxWidthSmoother isHidden={!isOpen}>
        <StyledPanelContainer ref={panelRef}>
          <StyledHeader>
            <StyledNavBar>
              <h2>{typeof title === 'string' ? capitalize(title) : title}</h2>
              <StyledCloseButton onClick={close} />
            </StyledNavBar>
            {header}
          </StyledHeader>
          <StyledScrollableContainer>{children}</StyledScrollableContainer>
        </StyledPanelContainer>
      </MaxWidthSmoother>
    </StyledPositioner>
  );
};
