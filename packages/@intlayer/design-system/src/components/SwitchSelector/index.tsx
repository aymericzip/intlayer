import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { styled } from 'styled-components';
import tw, { type TwStyle } from 'twin.macro';

export type SwitchSelectorChoice<T> = {
  content: ReactNode;
  value: T;
} & HTMLAttributes<HTMLButtonElement>;
export type SwitchSelectorChoices<T> = SwitchSelectorChoice<T>[];

type SwitchSelectorProps<T = string> = {
  choices: SwitchSelectorChoices<T>;
  selectedChoice: T;
  onChange: (choice: T) => void;
  color?: Color;
  size?: Size;
};

type Color =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'neutral'
  | 'light'
  | 'dark'
  | 'text';
type Size = 'sm' | 'md' | 'lg';

type SwitchSelectorStyleProps = {
  $color: Color;
};

const sizeVariant: Record<Size, TwStyle> = {
  sm: tw`p-1`,
  md: tw`p-2`,
  lg: tw`p-4 p-3`,
};

const containerColorVariant: Record<Color, TwStyle> = {
  primary: tw`border-primary dark:border-primary-dark text-primary dark:text-primary-dark`,
  secondary: tw`border-secondary dark:border-secondary-dark text-secondary dark:text-secondary-dark`,
  destructive: tw`border-destructive dark:border-destructive-dark bg-destructive dark:bg-destructive-dark text-destructive`,
  neutral: tw`border-neutral dark:border-neutral-dark text-neutral dark:text-neutral-dark`,
  light: tw`border-white border-white text-white`,
  dark: tw`border-neutral-800 text-neutral-800`,
  text: tw`border-text dark:border-text-dark text-text dark:text-text-dark`,
};

const indicatorColorVariant: Record<Color, TwStyle> = {
  primary: tw`bg-primary dark:bg-primary-dark`,
  secondary: tw`bg-secondary dark:bg-secondary-dark`,
  destructive: tw`bg-destructive dark:bg-destructive-dark`,
  neutral: tw`bg-neutral dark:bg-neutral-dark`,
  light: tw`bg-white`,
  dark: tw`bg-neutral-800`,
  text: tw`bg-text dark:bg-text-dark`,
};

const StyledContainer = styled.div<SwitchSelectorStyleProps>`
  ${({ $color }) => containerColorVariant[$color]}
  ${tw`flex flex-row gap-2 rounded-full border border-[1.5px] p-[1.5px]`}
`;
const StyledChoiceIndicatorWrapper = tw.div`size-full relative flex flex-row items-center justify-center`;

type StyledChoiceProps = {
  $size: Size;
};

const StyledChoice = styled.button<StyledChoiceProps>`
  ${({ $size }) => sizeVariant[$size]}
  ${tw`text-sm font-medium ease-in-out transition-all motion-reduce:transition-none duration-300 z-1 aria-selected:cursor-default aria-selected:text-text-dark dark:aria-selected:text-text`}
`;

const StyledChoiceIndicator = styled.div<SwitchSelectorStyleProps>`
  ${({ $color }) => indicatorColorVariant[$color]}
  ${tw`absolute w-auto h-full rounded-full ease-in-out transition-[left,width] duration-300 motion-reduce:transition-none top-0 z-0`}
`;

type PositionState = {
  left: number;
  width: number;
};

/**
 *
 * Component that allows the user to select one of the provided choices.
 *
 * Example:
 * ```jsx
 * <SwitchSelector
 *   choices={[
 *     { content: 'Option 1', value: 'option1' },
 *     { content: 'Option 2', value: 'option2' },
 *     { content: 'Option 3', value: 'option3' },
 *   ]}
 *   selectedChoice="option1"
 *   onChange={(choice) => console.log(choice)}
 * />
 * ```
 */
export const SwitchSelector = <T,>({
  choices,
  selectedChoice,
  onChange,
  color = 'primary',
  size = 'md',
}: SwitchSelectorProps<T>) => {
  const optionsRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const [choiceIndicatorPosition, setChoiceIndicatorPosition] =
    useState<PositionState | null>(null);

  useEffect(() => {
    const calculateSelectedOptionRef = () => {
      const selectedOptionRef = optionsRefs.current.find(
        (option) => option?.getAttribute('aria-selected') === 'true'
      );

      if (!selectedOptionRef) return;

      const choiceIndicatorLeftPosition = selectedOptionRef?.offsetLeft;
      const choiceIndicatorWidth = selectedOptionRef?.offsetWidth;

      setChoiceIndicatorPosition({
        left: choiceIndicatorLeftPosition,
        width: choiceIndicatorWidth,
      });
    };

    calculateSelectedOptionRef();

    window.addEventListener('resize', calculateSelectedOptionRef);
    window.addEventListener('DOMContentLoaded', calculateSelectedOptionRef);

    return () => {
      window.removeEventListener('resize', calculateSelectedOptionRef);
      window.removeEventListener(
        'DOMContentLoaded',
        calculateSelectedOptionRef
      );
    };
  }, [selectedChoice]);

  return (
    <StyledContainer $color={color} role="tablist">
      <StyledChoiceIndicatorWrapper>
        {choices.map((choice, index) => {
          const { content, value, ...buttonProps } = choice;

          const isKeyOfKey =
            typeof value === 'string' || typeof value === 'number';

          const isSelected = selectedChoice === value;

          return (
            <StyledChoice
              {...buttonProps}
              key={isKeyOfKey ? value : index}
              role="tab"
              onClick={() => onChange(value)}
              aria-selected={isSelected}
              disabled={isSelected}
              ref={(el) => (optionsRefs.current[index] = el)}
              $size={size}
            >
              {content}
            </StyledChoice>
          );
        })}
        {choiceIndicatorPosition && (
          <StyledChoiceIndicator
            $color={color}
            style={choiceIndicatorPosition}
            ref={indicatorRef}
          />
        )}
      </StyledChoiceIndicatorWrapper>
    </StyledContainer>
  );
};
