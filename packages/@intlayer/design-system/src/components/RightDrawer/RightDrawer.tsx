'use client';

import { ChevronLeft, X } from 'lucide-react';
import {
  type ReactNode,
  type FC,
  useEffect,
  useRef,
  type MouseEventHandler,
} from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { useDevice } from '../../hooks/useDevice';
import { useScrollBlockage } from '../../hooks/useScrollBlockage';
import { capitalize } from '../../utils/capitalize';
import { MaxWidthSmoother } from '../MaxWidthSmoother/index';
import { useRightDrawerStore } from './useRightDrawerStore';

const StyledPositioner = tw.div`absolute right-0 top-0 h-full z-50 flex justify-end`;
const StyledPanelContainer = tw.div`h-screen flex flex-col bg-white/80 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur text-black relative w-screen md:w-[400px]`;
const StyledHeader = tw.div`flex flex-col p-6 gap-3`;
const StyledNavBar = tw.div`flex justify-between gap-3`;
const StyledScrollableContainer = tw.div`overflow-y-auto h-full p-2 flex flex-col`;
const StyledChildrenContainer = tw.div`flex-1`;
const StyledBackButton = tw.button`text-left flex flex-row items-center gap-1 cursor-pointer`;
const StyledTitle = tw.h2`text-lg font-bold flex justify-center items-center`;
const StyledCloseButton = styled(X)`
  ${tw`cursor-pointer ml-auto`}
`;

type BackButtonProps = {
  onBack: () => void;
  text?: string;
};

type RightDrawerProps = {
  title?: ReactNode;
  identifier: string;
  children?: ReactNode;
  header?: ReactNode;
  closeOnOutsideClick?: boolean;
  backButton?: BackButtonProps;
};

export const RightDrawer: FC<RightDrawerProps> = ({
  title,
  identifier,
  children,
  header,
  closeOnOutsideClick = true,
  backButton,
}) => {
  const { isMobile } = useDevice('md');
  const panelRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen, close } = useRightDrawerStore(identifier)();

  useScrollBlockage({
    disableScroll: isOpen,
    key: identifier ? 'right_drawer' : `right_drawer_${identifier}`,
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

  const handleSpareSpaceClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Check if the click trigger the background
    if (e.target !== e.currentTarget) {
      return;
    }

    if (isMobile) {
      close();
    }
  };

  return (
    <StyledPositioner>
      <MaxWidthSmoother isHidden={!isOpen} align="right">
        <StyledPanelContainer ref={panelRef}>
          <StyledHeader>
            <StyledNavBar>
              <div>
                {backButton && (
                  <StyledBackButton onClick={backButton.onBack}>
                    <ChevronLeft />
                    {backButton?.text}
                  </StyledBackButton>
                )}
              </div>
              <StyledCloseButton onClick={close} />
            </StyledNavBar>
            <StyledTitle>
              {typeof title === 'string' ? capitalize(title) : title}
            </StyledTitle>
            {header}
          </StyledHeader>

          <StyledScrollableContainer>
            <StyledChildrenContainer
              onClick={handleSpareSpaceClick}
              ref={childrenContainerRef}
            >
              {children}
            </StyledChildrenContainer>
          </StyledScrollableContainer>
        </StyledPanelContainer>
      </MaxWidthSmoother>
    </StyledPositioner>
  );
};
