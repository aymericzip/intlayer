'use client';

import { useEffect, useMemo, useState, type FC } from 'react';
import { Input } from '../Input';
import { Select } from '../Select';

const extractInitialState = (
  value: string | number
): { comparator: string | undefined; numberValue: string | undefined } => {
  let comparator;
  let numberValue;

  if (typeof value === 'number' || !isNaN(Number(value))) {
    // If value is a number or numeric string, set comparator to '=' and numberValue accordingly
    comparator = '=';
    numberValue = value.toString();
  } else if (typeof value === 'string') {
    // Define possible comparators
    const comparators = ['<=', '>=', '<', '>', '='];
    // Find the comparator that matches the start of the string
    const matchedComparator = comparators.find((comp) =>
      value.startsWith(comp)
    );
    if (matchedComparator) {
      comparator = matchedComparator;
      numberValue = value.slice(matchedComparator.length);
    }
  }

  return { comparator, numberValue };
};

type EnumKeyInputProps = {
  value: string | number;
  onChange: (value: string) => void;
};

/**
 * Example of values:
 * - `<1`
 * - `>-44.3`
 * - `=999`
 * - `<=1`
 * - `>=1`
 * - 88
 * - `-1`
 *
 */
export const EnumKeyInput: FC<EnumKeyInputProps> = ({ value, onChange }) => {
  const { comparator: initialComparator, numberValue: initialNumberValue } =
    useMemo(() => extractInitialState(value), [value]);
  const [comparator, setComparator] = useState<string | null>(
    initialComparator ?? null
  );
  const [numberValue, setNumberValue] = useState<string | null>(
    initialNumberValue ?? null
  );

  useEffect(() => {
    if (
      comparator &&
      numberValue &&
      (comparator !== initialComparator || numberValue !== initialNumberValue)
    ) {
      const newValue = `${comparator}${numberValue}`;

      onChange(newValue);
    }
  }, [
    comparator,
    initialComparator,
    initialNumberValue,
    numberValue,
    onChange,
  ]);

  return (
    <div className="flex gap-1">
      <Select onValueChange={setComparator} defaultValue={initialComparator}>
        <Select.Trigger className="w-20">
          <Select.Value placeholder="Select a comparator" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="<">{`<`}</Select.Item>
          <Select.Item value="<=">{`<=`}</Select.Item>
          <Select.Item value="=">{`=`}</Select.Item>
          <Select.Item value=">=">{`>=`}</Select.Item>
          <Select.Item value=">">{`>`}</Select.Item>
        </Select.Content>
      </Select>
      <Input
        type="number"
        aria-label="Quantity"
        defaultValue={numberValue ?? undefined}
        onChange={(e) => setNumberValue(e.target.value)}
        className="min-w-4"
      />
    </div>
  );
};
