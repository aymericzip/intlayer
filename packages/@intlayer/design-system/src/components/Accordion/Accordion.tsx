'use client';

import { ChevronDown } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { Button, ButtonProps } from '../Button';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

type AccordionProps = {
  identifier: string;
  header: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
} & ButtonProps;

/**
 * Accordion component that allows the user to expand and collapse content.
 * It provides a header with a chevron icon that controls the visibility of the content.
 *
 * @param header - The content of the header.
 * @param children - The content to be expanded and collapsed.
 * @param isOpen - Whether the content is expanded or collapsed by default.
 *
 * @example
 * <Accordion header="Accordion Header" isOpen={true}>
 *   <p>Accordion content</p>
 * </Accordion>
 *
 */
export const Accordion: FC<AccordionProps> = ({
  children,
  header,
  isOpen: isOpenDefault = false,
  onClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const isHidden = isOpen == undefined ? undefined : !isOpen;

  useEffect(() => {
    if (isOpenDefault != undefined) {
      setIsOpen(isOpenDefault);
    }
  }, [isOpenDefault]);

  const Icon = useCallback(
    () => (
      <ChevronDown
        size={16}
        className={cn(
          'transform transition-transform duration-500 ease-in-out',
          isOpen ? 'rotate-0' : 'rotate-180'
        )}
      />
    ),
    [isOpen]
  );

  return (
    <>
      <Button
        variant="hoverable"
        color="text"
        onClick={(e) => {
          setIsOpen((prevIsOpen) => !prevIsOpen);
          onClick?.(e);
        }}
        isFullWidth
        IconRight={Icon}
        {...props}
      >
        {header}
      </Button>

      <MaxHeightSmoother
        tabIndex={isHidden !== false ? undefined : -1}
        isHidden={isHidden}
      >
        {children}
      </MaxHeightSmoother>
    </>
  );
};
