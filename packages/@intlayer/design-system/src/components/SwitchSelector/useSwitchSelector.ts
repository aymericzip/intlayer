'use client';

import {
  type ItemSelectorOrientation,
  useItemSelector,
} from '@hooks/useItemSelector';
import { useEffect, useRef, useState } from 'react';
import type { SwitchSelectorBaseProps } from './SwitchSelector';

export const useSwitchSelector = <T>(
  {
    choices = [],
    value,
    defaultValue,
    onChange,
    hoverable = true,
    disabled = false,
  }: SwitchSelectorBaseProps<T>,
  orientation: ItemSelectorOrientation
) => {
  const [valueState, setValue] = useState<T>(
    value ?? defaultValue ?? choices[0]?.value
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const optionsRefs = useRef<HTMLButtonElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition } = useItemSelector(optionsRefs, {
    selector: (el) => el.getAttribute('data-indicator') === 'true',
    isHoverable: false,
    orientation,
  });

  const selectedIndex = choices.findIndex(
    (choice) => choice.value === valueState
  );

  // The indicator follows hover if hoverable, otherwise the selected option
  const indicatorIndex =
    hoverable && hoveredIndex !== null ? hoveredIndex : selectedIndex;

  const handleChange = (newValue: T) => {
    console.log('useSwitchSelector handleChange', newValue);
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    if (value === undefined) return;
    setValue(value);
  }, [value]);

  return {
    valueState,
    hoveredIndex,
    setHoveredIndex,
    optionsRefs,
    indicatorRef,
    choiceIndicatorPosition,
    selectedIndex,
    indicatorIndex,
    handleChange,
    disabled,
  };
};
